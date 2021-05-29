'use strict'
function concateZero(n) {
  if (n === 0) return 12
  return n <= 9 ? `0${n}` : `${n}`
}

function formatarDate(date) {
  let d = concateZero(date.getDate() + 1)
  let m = concateZero(date.getMonth())
  let a = concateZero(date.getFullYear())
  return `${d}-${m}-${a}`
}

function formataValor(obj) {
  if (obj.valorAtualJuroSaldoAmort > 999999) {
    obj.valorNovoFormatado = '.$1.$2,$3'
    return /([0-9]{3})([0-9]{3}).([0-9]{2}$)/g
  }
  if (obj.valorAtualJuroSaldoAmort > 999) {
    obj.valorNovoFormatado = '.$1,$2'
    return /([0-9]{3}).([0-9]{2}$)/g
  }
  obj.valorNovoFormatado = ',$1'
  return /.([0-9]{2})$/g
}

class routes {

  diasDaUltimaParcela(obj) {
    obj.dias = Math.abs((obj.dyas2 - obj.dyas) / 1000 / 60 / 60 / 24)
    return obj
  }

  taxaDoMesProporcional(obj) {
    obj.taxaMes = ((1 + parseFloat(obj.taxa) / 100) ** (obj.dias / 360) - 1)
    return obj
  }

  DataDoPagamento(obj) {
    let proximoMes = obj.NovaData.setMonth(obj.NovaData.getMonth() + 1)
    obj.vencimento = formatarDate(obj.NovaData)
    if (obj.i % 2 === 0) {
      obj.dyas2 = proximoMes
    }
    else {
      obj.dyas = proximoMes
    }

    return obj
  }

  numeroDaParcela(obj) {
    obj.Parc = `${obj.i}ª`
    return obj
  }

  amortcal(obj) {
    obj.valorLocalFinanciado = parseFloat(obj.valorFinanciado.replace(/\./gi, "").replace(/,/, "."))
    obj.amortizacaoLocal = obj.valorLocalFinanciado / parseFloat(obj.quantParc)
    obj.valorAtualJuroSaldoAmort = obj.amortizacaoLocal

    obj.valorAmortAtual = formataValor(obj)
    obj.amortizacao = `${obj.amortizacaoLocal.toFixed(2).replace(obj.valorAmortAtual, obj.valorNovoFormatado)}`

    return obj
  }
  taxacal(obj) {
    obj.saldo = obj.valorLocalFinanciado - obj.amortizacaoLocal * obj.i
    obj.jurosLocal = (obj.saldo + obj.amortizacaoLocal) * obj.taxaMes
    obj.valorAtualJuroSaldoAmort = obj.jurosLocal


    obj.valorJurosAtual = formataValor(obj)
    obj.juros = `${obj.jurosLocal.toFixed(2).replace(obj.valorJurosAtual, obj.valorNovoFormatado)}`

    return obj
  }
  prestcal(obj) {
    obj.prestacaoLocal = obj.amortizacaoLocal + obj.jurosLocal
    obj.valorAtualJuroSaldoAmort = obj.prestacaoLocal

    obj.parcvalor2 = formataValor(obj)
    obj.prestacao = `${obj.prestacaoLocal.toFixed(2).replace(obj.parcvalor2, obj.valorNovoFormatado)}`

    return obj
  }
  saldocal(obj) {
    obj.valorAtualJuroSaldoAmort = obj.saldo

    obj.saldovalor2 = formataValor(obj)
    obj.saldo = `${obj.saldo.toFixed(2).replace(obj.saldovalor2, obj.valorNovoFormatado)}`
    obj.i++

    return obj
  }
}
export default { routes: new routes() }
