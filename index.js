const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Peng's restaurant", sName:"Peng Shao"});
    }
    render(sPage) {
        const oJson = fetch("https://mobile-app-dev-feb-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <h2>${oEntity.location}</h2>
            <h2>${oEntity.Date_of_event}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <h3>${oEntity.description}</h3>
            <h3>${oEntity.price}</h3>
            <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="21" />
            <input type="tel" placeholder="enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}