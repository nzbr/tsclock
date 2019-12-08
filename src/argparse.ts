function parseGetParams(): Map<string, Arg> {
    let query = document.location.search;
    if (query[0] == "?") {
        query = query.substr(1);
    }

    let argmap = new Map<string, Arg>();
    let args = query.split("&");
    args.forEach(arg => {
        let parts = arg.split("=");
        if (parts.length != 2) { return; }
        argmap.set(parts[0], new Arg(parts[1]));
    });

    return argmap;
}

class Arg {
    readonly strc: string;

    readonly boolc: boolean;
    
    readonly isNum: boolean;
    readonly numc: number;

    readonly isArr: boolean;
    readonly arrc: Array<Arg>;

    readonly isDate: boolean;
    readonly datec: Date;
    
    constructor(content: string) {
        this.strc = content;
        this.boolc = this.parseBool(content);

        let numres = this.parseNum(content);
        this.isNum = numres.bool;
        this.numc = numres.data;

        let arrres = this.parseArr(content);
        this.isArr = arrres.bool;
        this.arrc = arrres.data;

        let dateres = this.parseDate(content);
        this.isDate = dateres.bool;
        this.datec = dateres.data;
    }

    private parseBool(content: string): boolean {
        return !(content.trim().toLowerCase() == "false")
    }

    private parseNum(content: string): ResultTuple<number> {
        let numc = NaN;
        let isNum = false;
        
        try {
            numc = Number(content);
            if (numc != NaN) {
                isNum = true;
            }
        } catch {}

        return new ResultTuple<number>(isNum, numc);
    }

    private parseArr(content: string): ResultTuple<Array<Arg>> {
        let isArr = false;
        let arrc = null;

        let split = content.split(",");
        if (split.length > 1) {
            isArr = true;
            arrc = new Array();
            split.forEach(argstring => {
                let arg = new Arg(argstring);
                this.arrc.push(arg);
            });
        }

        return new ResultTuple<Array<Arg>>(isArr, arrc);
    }

    private parseDate(content: string): ResultTuple<Date> {
        let date: Date = null;

        let tstamp = Date.parse(content) + new Date().getTimezoneOffset() * (60*1000);
        if (tstamp != NaN) {
            date = new Date(tstamp);
        }
        
        return new ResultTuple<Date>(true, date);
    }
}

class ResultTuple<T> {
    readonly bool: boolean;
    readonly data: T;
    
    constructor(b: boolean, d: T) {
        this.bool = b;
        this.data = d;
    }
}
