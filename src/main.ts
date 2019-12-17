const nulldate = -3600000; // I have no idea, but this works

function pad(s: string, p: string, len: number, front: boolean): string {
    let result = s;
    while (result.length < len) {
        if (front) {
            result = p + result;
        } else {
            result = result + p;
        }
    }
    return result;
}

function load() {
    let getparams = parseGetParams();

    dialogSetup(getparams);

    if (getparams.has("color")) {
      let styleNode = document.createElement("style");
      styleNode.innerHTML = ".texture { background-color: "+getparams.get("color").strc+"; background-image: none; }";
      document.head.appendChild(styleNode);
    }

    let text = document.getElementById("clocktext");

    let hasEnd = false;
    let to = new Date();

    if (getparams.has("to") && getparams.get("to").isDate) {
        hasEnd = true;
        to = getparams.get("to").datec;
        console.log(to);
    }

    let left = 10;
    let t = 0;
    let lmode = 0;
    let tmode = 0;
    let move = 5;

    let dvd = false;
    document.getElementById("dvd").addEventListener("click", () => {
      dvd = !dvd;
    });
    setInterval(() => {
      if(dvd){
      if (lmode == 0){
        left += move;
      }
      if (tmode == 0){
        t += move;
      }
      if (lmode == 1){
        left -= move;
      }
      if (tmode == 1){
        t -= move;
      }
      if (left >= window.innerWidth- text.offsetWidth-10 ){
        lmode = 1;
      }
      if (left <= 0){
        lmode = 0;
      }
      if (t >= window.innerHeight- text.offsetHeight-10 ){
        tmode = 1;
      }
      if (t <= 0){
        tmode = 0;
      }
      text.setAttribute("style", "position: absolute; left: "+left+"px; top:"+t+"px;");
      }else{
      text.setAttribute("style", "");
      }


    }, 10)

    let redirected = false;
    setInterval(() => {
        let date = new Date()
        if (hasEnd) {
            let dateint = to.getTime() - date.getTime()
            if (dateint < nulldate) {
                date = new Date(nulldate)
            } else {
                date = new Date(dateint);
            }
        }
        let d = date.getDate() - 1;
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let x = date.getMilliseconds();

        let txt = "";
        txt =       pad(h.toString(), "0", 2, true)
            + ":" + pad(m.toString(), "0", 2, true)
            + ":" + pad(s.toString(), "0", 2, true)
            + " . " + pad(x.toString(), "0", 3, true);

        if (d > 0 && nulldate < date.getTime() && hasEnd) {
            txt = d.toString() + " Day" + ((d > 1)?"s":"") + "<br/>" + txt;
        }

        text.innerHTML = txt;

        if (date.getTime() <= nulldate && getparams.has("redir") && !redirected) {
            redirected = true;
            document.location.href = decodeURIComponent(getparams.get("redir").strc);
        }
    }, 1);
}

window.onload = load;
