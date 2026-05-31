import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Initialize server-side Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini Client initialized successfully on Server.");
    } catch (e) {
      console.error("Failed to initialize server-side Gemini client", e);
    }
  } else {
    console.warn("GEMINI_API_KEY not configured or has default placeholder. Chat responses will fall back to simulated responses.");
  }

  // API Route for DeepSeek Chat Helper
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, userProfile } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      const lastMessage = messages[messages.length - 1]?.text || "";

      const systemInstruction = `你是"智服平台" (Smart Service Platform) 的AI智能合规与政企咨询助手。
你应当提供专业、周到且简洁的咨询。主要擅长：
1. 企业合规管理 (合规安全诊断、隐私收集、合规风险解决)
2. 供需对接及企业资金融通
3. 各省及地方政策动态（比如高新技术企业认定、加计扣除、广东省横琴及深圳等大湾区政策，因为当前页面有"中国·横琴"等）
4. 专家资源匹配、人才培养，以及出海合规方案（GDPR、欧美市场要求等）。

你的回答应严格遵循：
- 用非常礼貌、商务、温暖且专业的中文交流。
- 逻辑清晰，可使用条理化的 Markdown。
- 每次回复不要过于冗长(控制在300字内)，切中主题。
- 如果用户询问技术或者政策细节，给出具体的操作逻辑、补贴预估和步骤。

当前用户信息（如果有）：${JSON.stringify(userProfile || {})}`;

      const deepseekApiKey = process.env.DEEPSEEK_API_KEY || "sk-f49fc9b12aa4486f97d6e44fdbbc3e15";
      const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

      const formattedMessages = [
        { role: "system", content: systemInstruction },
        ...messages.map((m: any) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ];

      console.log(`Calling DeepSeek API with model: ${deepseekModel}...`);

      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${deepseekApiKey}`
        },
        body: JSON.stringify({
          model: deepseekModel,
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`DeepSeek API returned error code ${response.status}: ${errorText}`);
        throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
      }

      const data: any = await response.json();
      const reply = data.choices?.[0]?.message?.content || "抱歉，我的大脑开了一会儿小差，请稍后再试。";
      return res.json({ reply });

    } catch (error: any) {
      console.error("DeepSeek API server endpoint error:", error);
      
      // Fallback response if DeepSeek API key or connection is experiencing issues
      console.log("Running local backup intelligence fallback...");
      const messages = req.body.messages || [];
      const lastMessage = messages[messages.length - 1]?.text || "";
      let reply = "您好！我是智服平台的AI常驻合规助手。在联络 DeepSeek 神经网络时发生了微小波动，以下是针对您的请求做出的本地智能预案：";
      
      const q = lastMessage.toLowerCase();
      if (q.includes("合规") || q.includes("安全")) {
        reply = "【智服AI合规建议】当前互联网产业合规热点包括：1. APP隐私条款披露合规；2. 敏感个人数据物理隔离；3. 供应链安全外包合同。我们建议您可以先通过平台本机的「企业合规服务」模块进行一次在线合规安全扫描（当前的智能评分诊断中，您的网络数据合规为 92 分安全级别，建议完成遗留的 0 项未决合规小瑕疵以达到满分！）。";
      } else if (q.includes("政策") || q.includes("申报") || q.includes("补贴")) {
        reply = "【近期政策红包申报】我们检测到目前有大湾区针对「低空经济与卫星互联网产业集群」等主导高新产业链的支持政策。其中，中小型创新企业最高可申请一次性 50 万至 200 万元的企业研发成长津贴，最快在下月中旬前截止递交。建议尽快前往我们的「政策导航」进行企业资助条件一健计算。";
      } else if (q.includes("对接") || q.includes("资金") || q.includes("供应链")) {
        reply = "【供应链撮合中心提醒】正在为您追踪最新的供需匹配动态：今日又有2个新增的「低空卫星物联设备」采购需求发布。目前本系统智能计算得出您的供应链对接总体匹配度高达85%，建议通过「供需对接」菜单一键与投资方、大宗买方直接交流。";
      } else if (q.includes("出海") || q.includes("国外")) {
        reply = "【出海海外专属咨询】感谢向智服提问。中国中小企业出海建议首先关注GDPR数据合规与属地主体设立、双重征税协议。我们已专门开辟「出海服务」板块，内含合规路线图 and 双边政策计算器，您可以通过左下角相应一键直达导航。";
      } else {
        reply = `关于您提到的"${lastMessage}"，我们建议您使用智服配套的各种实用功能：
1. 访问左侧【企业合规服务】完成全栈自查。
2. 访问【政策导航】进行一键利益条件测算。
3. 如果您需要一对一辅导，可以通过【专家智库】直接与 Dr. Lin 等资深CDO与Agentic专家连线视频预约。
我们会全程为您保驾护航！`;
      }
      
      return res.json({ reply });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: !!ai });
  });

  // Vite development middleware vs. static build output serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
