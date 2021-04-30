const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor() {
        super({ title: "Peng's restaurant", sName: "Peng Shao" });
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
            <form action="https://mobile-ass2.herokuapp.com/payment" method="post">
            <input id="price" type="hidden" name="price" value="${oEntity.price}" />
            <input id="tel" type="text" placeholder="enter your number" name="telephone"/>
            <button id="submit" type="submit">Order now</button>
            </form>

            
            <script> 
                const ${oEntity.title} = new PouchDB('users'); 
        doc = {
            _id: new Date().toISOString(),
            title: "${oEntity.title}",
            price:"${oEntity.price}",
        };
        
        ${oEntity.title}.put(doc).then((res) => {
            console.log("Document inserted OK");
        }).catch((err) => {
            console.error(err);
        });
        
        </script>
            `;
        });
        return sResult;
    }

}