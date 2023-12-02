document.getElementById("play-button").addEventListener("click", function() {
    document.getElementById("video-container").innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/x9A49MD8cYo?si=jbOLkDLQqZRlq7ba" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>    `;  
  });