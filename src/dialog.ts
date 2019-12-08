function dialogSetup(getparams: Map<string, Arg>) {
    let date = (<HTMLInputElement>document.getElementById("date"));
    let hou = (<HTMLInputElement>document.getElementById("hou"));
    let min = (<HTMLInputElement>document.getElementById("min"));
    let sec = (<HTMLInputElement>document.getElementById("sec"));
    let msc = (<HTMLInputElement>document.getElementById("msc"));
    let redir = (<HTMLInputElement>document.getElementById("redirect"));
    let clear = (<HTMLInputElement>document.getElementById("clearbtn"));
    
    // Initialize inputs with the current time
    let cdate = new Date();
    if (getparams.has("to") && getparams.get("to").isDate) {
        cdate = getparams.get("to").datec;

        clear.addEventListener("click", () => {
            document.location.search="";
        })
    } else {
        clear.style.display="none";
    }
    date.value = cdate.toISOString().substring(0,10);
    hou.value = cdate.getHours().toString();
    min.value = cdate.getMinutes().toString();
    sec.value = cdate.getSeconds().toString();

    if (getparams.has("redir")) {
        redir.value = decodeURIComponent(getparams.get("redir").strc);
    }

    Array.from(document.getElementsByClassName("dialogclose")).forEach(element => {
        element.addEventListener("click", () => {
            document.getElementById("dialogcontainer").style.display="none";
        });
    });

    document.getElementById("dialogbtn").addEventListener("click", () => {
        document.getElementById("dialogcontainer").style.display="flex";
    })

    document.getElementById("dialogok").addEventListener("click", () => {
        let sdate = date.value;
        let shou = hou.value;
        let smin = min.value;
        let ssec = sec.value;
        let smsc = msc.value;

        let isotime = sdate + "T" + pad(shou, "0", 2, true) +":"+ pad(smin, "0", 2, true) +":"+ pad(ssec, "0", 2, true) +"."+ pad(smsc, "0", 3, true);
        let query = "to="+isotime;

        if (redir.value != "") {
            query += "&redir=" + encodeURIComponent(redir.value);
        }
        document.location.search=query;
    })
}
