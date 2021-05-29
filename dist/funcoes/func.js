"use strict";Object.defineProperty(exports, "__esModule", {value: true});'use strict'

class routes  {
  diasDaUltimaParcela(obj) {
    if (obj.dyas2 === undefined || obj.dyas === undefined || obj.dyas2 < 1 || obj.dyas < 1) {
      obj.taxamem = ''
    }
    else {
      obj.taxamem = Math.abs((obj.dyas - obj.dyas2) / 1000 / 60 / 60 / 24)
    }
    obj.dias = obj.taxamem

    return obj
  }
  taxaDoMesProporcional(obj) {
    if (obj.dyas2 === undefined && obj.dyas2 === undefined) {
      obj.taxaDoMes1 = ''
    }
    else {
      obj.taxaDoMes1 = (
        (1 + parseFloat(obj.taxa) / 100) ** (obj.taxamem / 360) - 1
      ).toFixed(5)
    }
    obj.taxaMes = obj.taxaDoMes1

    return obj
    //obj.ar2.push(obj.taxaDoMes1);
  }
  DataDoPagamento(obj) {
    function cal(n) {
      if (n === 0) return 12
      return n <= 9 ? `0${n}` : `${n}`
    }

    function formatarDate(date) {
      let d = cal(date.getDate())
      let m = cal(date.getMonth())
      let a = cal(date.getFullYear())
      return `${d}-${m}-${a}`
    }

    let dd = obj.NovaData.setMonth(obj.NovaData.getMonth() + 1)

    if (obj.dyas2 === undefined && obj.dyas2 === undefined) {
      obj.dataLocal = ''
    }
    else {
      obj.dataLocal = formatarDate(obj.NovaData)
    }
    obj.vencimento = obj.dataLocal

    //obj.ar3.push(dataLocal);
    if (obj.i % 2 === 0) {
      obj.dyas = dd
    }
    else {
      obj.dyas2 = dd
    }

    return obj
  }
  numeroDaParcela(obj) {
    //var pp;
    if (obj.taxaDoMes1 === '') {
      obj.pp = ''
    }
    else {
      obj.pp = `${obj.i}ª`
    }
    obj.Parc = obj.pp

    return obj
    //obj.ar4.push(pp);
  }
  amortcal(obj) {
    obj.fin = parseFloat(
      obj.valorFinanciado.replace(/\./gi, "").replace(/,/, ".")
    )

    obj.Amort = obj.fin / parseFloat(obj.quantParc)
    obj.saldo = obj.fin - obj.Amort * obj.i
    obj.taxa1 = ((obj.saldo + obj.Amort) * parseFloat(obj.taxa)) / 100
    obj.parc = obj.Amort + obj.taxa1
    obj.Amortvalor3 = ',$1'
    obj.AmortLocal = obj.Amort

    obj.Amortvalor1 = function valor1() {
      if (obj.AmortLocal > 999999) {
        obj.Amortvalor3 = '.$1.$2,$3'
        return /([0-9]{3})([0-9]{3}).([0-9]{2}$)/g
      }
      if (obj.AmortLocal > 999) {
        obj.Amortvalor3 = '.$1,$2'
        return /([0-9]{3}).([0-9]{2}$)/g
      }

      return /.([0-9]{2})$/g
    }

    obj.Amortvalor2 = obj.Amortvalor1()
    obj.amortizacao = `${obj.Amort.toFixed(2).replace(obj.Amortvalor2, obj.Amortvalor3)}`

    return obj
    //obj.ar5.push(`${obj.Amort.toFixed(2).replace(obj.Amortvalor2, obj.Amortvalor3)}`);
  }
  taxacal(obj) {
    obj.fin = parseFloat(
      obj.valorFinanciado.replace(/\./gi, "").replace(/,/, ".")
    )
    obj.Amort = obj.fin / parseFloat(obj.quantParc)
    obj.saldo = obj.fin - obj.Amort * obj.i
    // taxa1 =((obj.saldo+Amort) * parseFloat(taxa)/100)
    obj.taxa1 = (obj.saldo + obj.Amort) * obj.taxaDoMes1
    obj.parc = obj.Amort + obj.taxa1
    obj.taxa1valor3 = ',$1'
    obj.taxa1Local = obj.taxa1

    obj.taxa1valor1 = function valor1() {
      if (obj.taxa1Local > 999999.99) {
        obj.taxa1valor3 = '.$1.$2,$3'
        return /([0-9]{3})([0-9]{3}).([0-9]{2}$)/g
      }
      if (obj.taxa1Local > 999.99) {
        obj.taxa1valor3 = '.$1,$2'
        return /([0-9]{3}).([0-9]{2}$)/g
      }

      return /.([0-9]{2})$/g
    }

    obj.taxa1valor2 = obj.taxa1valor1()
    obj.juros = `${obj.taxa1.toFixed(2).replace(obj.taxa1valor2, obj.taxa1valor3)}`

    return obj
    // obj.ar6.push(`${obj.taxa1.toFixed(2).replace(taxa1valor2, taxa1valor3)}` );
  }
  prestcal(obj) {
    obj.fin = parseFloat(
      obj.valorFinanciado.replace(/\./gi, "").replace(/,/, ".")
    )
    obj.Amort = obj.fin / parseFloat(obj.quantParc)
    obj.saldo = obj.fin - obj.Amort * obj.i
    obj.taxa1 = (obj.saldo + obj.Amort) * obj.taxaDoMes1
    obj.parc = obj.Amort + obj.taxa1
    obj.parcvalor3 = ',$1'
    obj.parcLocal = obj.parc

    obj.parcvalor1 = function valor1() {
      if (obj.parcLocal > 999999.99) {
        obj.parcvalor3 = '.$1.$2,$3'
        return /([0-9]{3})([0-9]{3}).([0-9]{2}$)/g
      }
      if (obj.parcLocal > 999.99) {
        obj.parcvalor3 = '.$1,$2'
        return /([0-9]{3}).([0-9]{2}$)/g
      }

      return /.([0-9]{2})$/g
    }

    obj.parcvalor2 = obj.parcvalor1()
    obj.prestacao = `${obj.parc.toFixed(2).replace(obj.parcvalor2, obj.parcvalor3)}`

    return obj
    //obj.ar7.push(`${obj.parc.toFixed(2).replace(parcvalor2, parcvalor3)}`);
  }
  saldocal(obj) {
    obj.saldovalor3 = ',$1'
    obj.saldoLocal = obj.saldo

    obj.saldovalor1 = function valor1() {
      if (obj.saldoLocal > 999999.99) {
        obj.saldovalor3 = '.$1.$2,$3'
        return /([0-9]{3})([0-9]{3}).([0-9]{2}$)/g
      }
      if (obj.saldoLocal > 999.99) {
        obj.saldovalor3 = '.$1,$2'
        return /([0-9]{3}).([0-9]{2}$)/g
      }

      return /.([0-9]{2})$/g
    }

    obj.saldovalor2 = obj.saldovalor1()
    obj.saldo = 25//`${obj.saldo.toFixed(2).replace(obj.saldovalor2, obj.saldovalor3)}`
    obj.i++

    return obj
    //obj.ar8.push(`${obj.saldo.toFixed(2).replace(obj.saldovalor2, obj.saldovalor3)}` );
    //obj.i++;
  }
}

// export default {routes,
//   contra}

  exports. default = {
    routes: new routes(),
}

