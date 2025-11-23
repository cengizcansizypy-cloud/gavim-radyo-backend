exports.getSongs = async (req,res)=>{
  res.json({songs:[
    {title:"Song 1", url:"https://example.com/song1.mp3"},
    {title:"Song 2", url:"https://example.com/song2.mp3"}
  ]});
};
