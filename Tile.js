export function Tile (title, description, tools, codeLink, liveLink, img) { 
  return (`<div class="tile">
  <div class="front">
    <div class="contents">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_woI6yiG2gSjWPVfkZ0NcYUzf_K4uHsP9Q&usqp=CAU"/>
      <h3>${title}</h3>
      <p>${description}</p>
      <p>Hover to View Details</p>
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