import dbService from "./dbConnection.js";

const window={}

const dbConnection = await dbService.getBetConnection();

import request from "./networkUtils.js";

let arr=[];
for (let i=0;i<75;i++){

    const url=`https://v3.cdnsfree.com/genfiles/cms/betstemplates/bets_model_full_en_${i}.js`;
    console.log(i);
    try{
        const data = await request.get(url, true);
        const res=eval(data);
        arr.push(res[i]);
    }catch(ex) {

    }



}

for( let item of arr){
    for (let [key,value] of Object.entries(item)){
        const query = {"id": key}
        const update = { $set: {id: key, value: value}};
        const options = { upsert: true };
        dbConnection.collection('betWinnerGroups').updateOne( query, update,options)
    }
}

console.log()

//  dbConnection.collection('teams').replaceOne( {"team1": team1}, {team1: team1, team2: team2, distance: distance}, {u