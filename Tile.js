export function Tile (title, description, tools, codeLink, liveLink, img) { 
  return (`<div class="tile">
  <div class="front">
    <div class="contents">
      <img src="https://picsum.photos/424/156"/>
      <h3>${title}</h3>
      <p>${description}</p>
      <br>
      Hover to View Details
    </div>
  </div>
  <div class="back">
    <h3>Tools Used:</h3>
    <ul>
      ${tools.map(tool => (
        `<li>${tool}</li>`
      )).join('')}
    </ul>
    <div class="back-links">
      ${codeLink ?
        `<a href=${codeLink} target="_blank">See the Code</a>`
        : ""
      }
      ${liveLink?
        `<a href=${liveLink} target="_blank">See It In Action</a>`
        : ""
      }
    </div>
  </div>
  </div>`)
}