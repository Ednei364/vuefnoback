'use strict'

const erros = {

    verifica(obj) {
        if (!obj.empresa) {
            return obj.erro = ('Empresa não informada')
        }
        if (!obj.contrato) {
            return obj.erro = ('Contrato não informado')
        }
        if (!obj.datadocred) {
            return obj.erro = ('Data não informado')
        }
        if (!obj.banco) {
            return obj.erro = ('Banco não informado')
        }
        if (!obj.valorFinanciado) {
            return obj.erro = ('valor não informado')
        }
        if (!obj.quantParc) {
            return obj.erro= ('Numero de parcelas não informado')
        }
        if (obj.quantParc > 420) {
            return obj.erro= ('Numero de parcelas acima do permitido')
        }
        if (!obj.taxa) {
            return obj.erro = ('Taxa não informada ')
        }

    }

}
export default erros