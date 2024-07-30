import * as brcpt from "bcrypt";


function hashPassword(password){
    const salt=brcpt.genSaltSync(10)
    return brcpt.hashSync(password,salt)
}

export default hashPassword
