import bcrpt from 'bcrypt';

function compare_password(user_password,db_password){
    const result=bcrpt.compareSync(user_password,db_password);
    return result;
}

export default compare_password;