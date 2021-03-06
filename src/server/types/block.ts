import { Transaction } from "./transaction";

export class BlockDetail{
    public block_identifier:BlockIdentifier = new BlockIdentifier();
    public parent_block_identifier:BlockIdentifier = new BlockIdentifier();
    public timestamp:number = 0;
    public transactions:Array<Transaction> | undefined;
    public metadata:any | undefined;
}

export class BlockIdentifier{
    public index:number = 0;
    public hash:string = "";
}