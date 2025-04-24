/* eslint-disable react/prop-types */
import "./components.css"


function ButtonComponent({desc, onclick}) {
  return (
      <div className="button-container" onClick={onclick}>
          <button >{desc}</button>
    </div>
  )
}

export default ButtonComponent