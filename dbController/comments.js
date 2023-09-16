const getComments = async (req, res) => {
    return res.send([
      {
        comment:
          "best recipe i have ever seen as i love this recipe very much.",
        user: "jofra archor",
        time: "4 HOURS",
      },
      {
        comment: "foody lover must have to try this as it is brilliant.",
        user: "foody jack",
        time: "1 HOURS",
      },
      {
        comment:
          "this is the recipe to try ,try this be fearless, and above all have fun!",
        user: "samule",
        time: "20 MINUTES",
      },
     
      
    ]);
  };

  module.exports=getComments