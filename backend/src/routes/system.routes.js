
const router = require("express").Router();
const os = require("os");

router.get("/metrics",(req,res)=>{
  res.json({
    cpu: os.loadavg(),
    memory: os.totalmem() - os.freemem(),
    uptime: os.uptime()
  });
});

router.get("/my-ip",(req,res)=>{
  res.json({ ip:req.ip, country:"India", timezone:"Asia/Kolkata" });
});

module.exports = router;
