const fs = require('fs')
const path = require('path')
const config = require('config');
const {NodeSSH} = require('node-ssh')
const generator = require('generate-password');

class ManagerServices{
    constructor(){
       
    }
     async addProxy(activeUntil){

        let clientSsh = await this.getClient();

        let [login,password] = generator.generateMultiple(2, {
            length: 10,
            uppercase: true
        });
        await clientSsh.exec('~/dante-install/addUser.sh',[login,password])
        return {
            service:"proxy",
            id: Math.floor(Math.random()*10000000000000000),
            ip: clientSsh.connection.config.host,
            login,
            password,
            activeUntil
        }
    }
    delProxy(id){

    }
    async addVpn(activeUntil){
        let clientSsh = await this.getClient();
        let [id] = generator.generateMultiple(1, {
            length: 16,
            uppercase: true
        });
        await clientSsh.exec('~/wireguard-install/addUser.sh',[id])
        let filePath = await clientSsh.exec('find',['/etc/wireguard/','-name',`*${id}*`])
        fs.writeFileSync(`./wgConf/${id}.conf`,await clientSsh.exec('cat',[filePath]));
        // find /etc/wireguard/ -name '*HyNcIogscKURwtUt*'
        return {
            service:"vpn",
            id,
            ip: clientSsh.connection.config.host,
            confPath : '',
            activeUntil 
        }
    }
    delVpn(id){

    }
    async getClient(){
        const ssh = new NodeSSH()
        let {host,port,username,password} = config.servers[0]
        
        await ssh.connect({
        host,
        port,
        username,
        password
        })

        return ssh
    }
}
module.exports = ManagerServices