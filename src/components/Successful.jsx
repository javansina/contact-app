function Successful({ text }) {
    constdocument.getElementById("successful").classList.add("w-0")
   return (
      <>
         <div className="bg-slate-500 w-fit">
            <div className="bg-slate-500 w-fit px-5">
               <span>{text}</span>
            </div>
            <div id="successful" className="p1 bg-purple-900 w-full h-1 successDivTransition"></div>
         </div>
      </>
   );
}

export default Successful;
