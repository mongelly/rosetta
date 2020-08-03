import { BaseGlobalEnvironment, iBaseConfig } from '../utils/components/baseGlobalEnvironment';
import { iLogHelperConfig, LogHelper } from '../utils/helper/logHelper';
import ConnexEx from '../utils/helper/connexEx';
import { NetworkType } from '../server/datameta/networkType';
import { array } from 'joi';

export class GlobalEnvironment extends BaseGlobalEnvironment{
    
    public netconnex:ConnexEx | undefined;
    public logHelper:LogHelper = new LogHelper();
    public mainNet180List:Array<VIP180Config> = new Array();
    public testNet180List:Array<VIP180Config> = new Array();
    
    constructor(config:any){
        super(config);
        this._initLogHelper(config);
        this._addVTHOToken();
    }

    public getConnex(type:NetworkType):ConnexEx | undefined{
        if(this.netconnex!.NetWorkType == type){
            return this.netconnex;
        } else {
            return undefined;
        }
    }

    public loadIP180TokenConfig(config:any)
    {
        this._addVIP180Token(config);
    }

    public getVIP180TokenList():Array<VIP180Config>
    {
        switch(this.netconnex!.NetWorkType){
            case NetworkType.MainNet:
                return this.mainNet180List;
            case NetworkType.TestNet:
                return this.mainNet180List;
            default:
                return new Array<VIP180Config>();
        }
    }

    private _initLogHelper(config:any){
        this.logHelper.init(config);
    }

    private _addVTHOToken()
    {
        this.mainNet180List.push(new VIP180Config("VeThor","0x0000000000000000000000000000456e65726779","VTHO",18));
        this.testNet180List.push(new VIP180Config("VeThor","0x0000000000000000000000000000456e65726779","VTHO",18));
    }

    private _addVIP180Token(config:any)
    {
        this._addVTHOToken();
        if(config.mainnet.vip180_list != null && config.mainnet.vip180_list as Array<any>)
        {
            for(var item of (config.mainnet.vip180_list as Array<any>))
            {
                this.mainNet180List.push(new VIP180Config(item.name,item.address,item.symbol,item.decimals));
            }
        }

        if(config.testnet.vip180_list != null && config.testnet.vip180_list as Array<any>)
        {
            for(var item of (config.testnet.vip180_list as Array<any>))
            {
                this.mainNet180List.push(new VIP180Config(item.name,item.address,item.symbol,item.decimals));
            }
        }
    }
}

export interface iConfig extends iBaseConfig,iLogHelperConfig
{
    port:number;
    confirm_num:number;
    netconfig:{
        node_api:string
    }
    rosetta_version:string
}

export class VIP180Config
{
    public name:string = "";
    public address:string = "";
    public symbol:string = "";
    public decimals:number = 0;
    public metadata:any | undefined;

    constructor(name:string,address:string,symbol:string,decimals:number,metadata?:any){
        this.name = name;
        this.address = address;
        this.symbol = symbol;
        this.decimals = decimals;
        this.metadata = metadata;
    }
}

export class NetConfig
{
    public node_api:string = "";
    public node_version:string = "";
    public vip180_list:Array<VIP180Config> = new Array<VIP180Config>()
}