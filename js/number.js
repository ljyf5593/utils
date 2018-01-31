class NumberFn {
  /*随机数范围*/
  random(min, max) {
    if (arguments.length === 2) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    } else {
      return null;
    }
  }

  /*将阿拉伯数字翻译成中文的大写数字*/
  numberToChinese(num) {
    var AA = new Array("零","一","二","三","四","五","六","七","八","九","十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
      k = 0,
      re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
      switch (k) {
        case 0:
          re = BB[7] + re;
          break;
        case 4:
          if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
            re = BB[4] + re;
          break;
        case 8:
          re = BB[5] + re;
          BB[7] = BB[5];
          k = 0;
          break;
      }
      if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
        re = AA[0] + re;
      if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
      k++;
    }

    if (a.length > 1) {
      // 加上小数部分(如果有小数部分)
      re += BB[6];
      for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == "一十") re = "十";
    if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
    return re;
  }

  // 金额转大写
  moneyToChinese(n) {
    //首位是否是负号
    var symbol = "";
    if (n < 0) {
      symbol = "负";
      n = -n;
    }

    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
      return "数据非法";
    }
    var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
      str = "";
    n += "00";
    var p = n.indexOf(".");

    // 如果含有小数点
    if (p >= 0) {
      // 去除小数点后面多余的数据
      n = n.substring(0, p) + n.substr(p + 1, 2);
    }

    // 如果数值为0则直接返回
    if (n - 0.00001 < 0) {
      return "零元整";
    }

    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) {
      str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
    }
    return (
      symbol +
      str
        .replace(/零(仟|佰|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万/g, "$1")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元整")
    );
  }

  // 千分位展示
  toThousands(num) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // 删除千分位
  delThousands(num) {
    if ((num + "").trim() == "") {
      return 0;
    }
    num = num.replace(/,/gi, "");
    return num;
  }

  /**
   * 格式化展示金额数字（千分位）
   * @param {number} s 要格式化的数字
   * @param {int} n 保留的小数位
   */
  numberFormat(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s
        .split(".")[0]
        .split("")
        .reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    return (
      t
        .split("")
        .reverse()
        .join("") +
      "." +
      r
    );
  }
}