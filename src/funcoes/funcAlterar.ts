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
  if (obj > 999999) {
    return obj.replace(/([0-9]{3})([0-9]{3}).([0-9]{2}$)/g, '.$1.$2,$3')
  }
  if (obj > 999) {
    return obj.replace(/([0-9]{3}).([0-9]{2}$)/g, '.$1,$2')
  }
  return obj.replace(/.([0-9]{2})$/g, ',$1')
}

class routes {

  taxacal(taxaAnual, dias) {

    return ((1 + parseFloat(taxaAnual) / 100) ** (dias / 360) - 1)
  }

  quantDias(anterior, atual) {
    let teste = anterior.replace(/([0-9]{2})-([0-9]{2})-([0-9]{4})/, '$3-$2-$1')
    let teste1 = atual.replace(/([0-9]{2})-([0-9]{2})-([0-9]{4})/, '$3-$2-$1')
    let anterio = new Date(teste).getTime()
    let agora = new Date(teste1).getTime()

    return Math.abs((agora - anterio) / 1000 / 60 / 60 / 24)
  }

  juros(saldo, taxa) {
    let valor = saldo.replace(/\./g, '').replace(/\,/g, '.')
    let resultado = (valor * taxa).toFixed(2)

    return formataValor(resultado)
  }

  somar(juros, amortizacao) {
    let jr = juros.replace(/\./g, '').replace(/\,/g, '.')
    let amort = amortizacao.replace(/\./g, '').replace(/\,/g, '.')
    let resultado = Number(jr) + Number(amort)
    let resultadoS = ''.concat(resultado)

    return formataValor(resultadoS)
  }


}
export default { routes: new routes() }
