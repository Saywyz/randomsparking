document.addEventListener('DOMContentLoaded', () => {
    const stringDict = {
        1: ["Mr. Satan"],
        2: ["Videl", "Master Roshi", "Yajirobe", "Chiaotzu", "Saibaman", "Frieza Force Soldier", "Spopovich", "Babidi"],
        3: ["Krillin", "Yamcha", "Tien", "Kid Gohan", "Guldo", "Cui", "Dodoria", "Zarbon", "Android 19", "Dr. Gero", "King Cold", "Nail", "Pan (GT)", "Botamo", "Magetta", "Ribrianne", "Kakunsa", "Roasie"],
        4: ["Goku (Z - Early)", "Piccolo (Early)", "Vegeta (Z - Scouter)", "Nappa", "Raditz", "Bardock", "Ginyu", "Recoome", "Burter", "Jeice", "Android 16", "Android 17 (Z)", "Android 18", "Cell (1st Form)", "Frieza (1st Form)", "Frieza (2nd Form)", "Frieza (3rd Form)", "Garlic Jr.", "Turles", "Lord Slug", "Cooler", "Metal Cooler", "Bojack", "Zangya", "Bergamo", "Basil", "Lavender", "Caulifla", "Kale", "Cabba", "Frost", "Goten", "Trunks (Kid)", "Goku (Mini)"],
        5: ["Goku (Z - Mid)", "Vegeta (Z - Early)", "Vegeta (Z - Mid)", "Trunks (Melee)", "Future Trunks", "Teen Gohan", "Piccolo (End)", "Android 17 (Super)", "Cell (2nd Form)", "Frieza (Final Form)", "Mecha Frieza", "Android 13", "Tapion", "Dabura", "Great Saiyaman", "Gotenks", "Goku (GT)", "Uub", "Baby Vegeta", "Master Roshi Max Power"],
        6: ["Goku (Z - End)", "Goku (Super)", "Vegeta (Z - End)", "Vegeta (Super)", "Future Trunks (Super)", "Gohan (Adult)", "Majin Vegeta", "Perfect Cell", "Cell Jr.", "Majin Buu", "Super Buu", "Frieza (Super)", "Final Form Cooler", "Fusion Android 13", "Full Power Bojack", "Janemba", "Hirudegarn", "Super Baby 1", "Super Baby 2", "Majuub", "Dyspo", "Goku Black"],
        7: ["Goku (Z - End) SS3", "Goku (Super) SS God", "Vegeta (Super) SS God", "Future Trunks (Super) SS Rage", "Super Buu (Gotenks Absorbed)", "Super Buu (Gohan Absorbed)", "Kid Buu", "Golden Frieza", "Super Janemba", "Great Ape Baby", "Syn Shenron", "Hit", "Toppo", "Kefla", "Goku Black Rose", "Broly (Z)", "Broly (Super)"],
        8: ["Goku (Super) SS Blue", "Vegeta (Super) SS Blue", "Vegeta (Super) SS Blue Evolved", "Golden Frieza", "Fused Zamasu", "Jiren", "God Toppo", "Kefla (SS1)", "Anilaza", "Goku (GT) SS4", "Vegeta (GT) SS4", "Omega Shenron", "Broly (Z) LSSJ", "Broly (Super) SSJ"],
        9: ["Goku (Super) UI Sign", "Broly (Super) Full Power", "Jiren (Full Power)", "Fused Zamasu (Corrupted)", "Gogeta (Super) SSJ", "Vegito (Super) SSJ", "Gogeta (GT) SS4", "Beerus"],
        10: ["Goku (Super) Ultra Instinct", "Gogeta (Super) SS Blue", "Vegito (Super) SS Blue", "Whis"]
    };

    document.getElementById('add-cost').addEventListener('click', () => {
        const costsContainer = document.getElementById('costs-container');
        const newCostGroup = document.createElement('div');
        newCostGroup.className = 'cost-group';
        newCostGroup.innerHTML = `
            <label for="cost">DP</label>
            <input type="number" class="cost" min="1" max="10" value="1">
            <button class="remove-cost">Delete</button>
        `;
        costsContainer.appendChild(newCostGroup);
        newCostGroup.querySelector('.remove-cost').addEventListener('click', () => {
            costsContainer.removeChild(newCostGroup);
        });
    });

    document.getElementById('generate-btn').addEventListener('click', () => {
        const characterList = document.getElementById("character-list");
        characterList.innerHTML = '';

        const costGroups = document.querySelectorAll('.cost-group');
        const usedCharacters = new Set();
        let totalCost = 0;

        costGroups.forEach(group => {
            const cost = parseInt(group.querySelector('.cost').value);

            if (cost >= 1 && cost <= 10) {
                const character = getUniqueCharacter(cost, usedCharacters);
                if (character) {
                    const listItem = document.createElement('li');
                    const stars = '★'.repeat(cost);
                    listItem.innerHTML = `<a href="https://www.google.com/search?hl=fr&tbm=isch&q=${encodeURIComponent(character + ' Sparking Zero')}" target="_blank">${character} (${stars})</a>`;
                    characterList.appendChild(listItem);
                    totalCost += cost;
                } else {
                    alert('Tous les personnages de ce coût ont déjà été tirés.');
                }
            } else {
                alert('Veuillez entrer des valeurs valides.');
            }
        });

        document.getElementById('total-cost').textContent = `Total Cost: ${totalCost}`;

        document.getElementById('pulled-title').classList.remove('hidden');
        characterList.classList.remove('hidden');
    });

    function getUniqueCharacter(cost, usedCharacters) {
        if (cost in stringDict) {
            const availableCharacters = stringDict[cost].filter(character => !usedCharacters.has(character));
            if (availableCharacters.length > 0) {
                const character = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
                usedCharacters.add(character);
                return character;
            }
        }
        return null;
    }
});
