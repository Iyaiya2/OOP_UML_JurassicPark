// Classe de base Dinosaur
class Dinosaur {
    constructor(name, species, age, weight, status = "disponible") {
        this.name = name;
        this.species = species;
        this.age = age;
        this.weight = weight;
        this.status = status;
    }

    displayInfo() {
        console.log(`Nom: ${this.name}, Espèce: ${this.species}, Âge: ${this.age} ans, Poids: ${this.weight} kg, État: ${this.status}`);
    }

    heal() {
        if (this.status === "malade") {
            this.status = "disponible";
            console.log(`${this.name} a été soigné et est maintenant disponible.`);
        } else {
            console.log(`${this.name} n'est pas malade.`);
        }
    }
}

// Classe Herbivore (hérite de Dinosaur)
class Herbivore extends Dinosaur {
    constructor(name, species, age, weight, preferredPlant, habitat, status = "disponible") {
        super(name, species, age, weight, status);
        this.preferredPlant = preferredPlant;
        this.habitat = habitat;
    }

    eatPlant() {
        console.log(`${this.name} mange sa plante préférée : ${this.preferredPlant}`);
    }
}

// Classe Carnivore (hérite de Dinosaur)
class Carnivore extends Dinosaur {
    constructor(name, species, age, weight, preferredPrey, huntingSkill, status = "disponible") {
        super(name, species, age, weight, status);
        this.preferredPrey = preferredPrey;
        this.huntingSkill = huntingSkill;
    }

    hunt() {
        console.log(`${this.name} chasse sa proie préférée : ${this.preferredPrey}`);
    }
}

// Classe Enclosure
class Enclosure {
    constructor(id, size, location, maxCapacity) {
        this.id = id;
        this.size = size;
        this.location = location;
        this.maxCapacity = maxCapacity;
        this.dinosaurs = [];
        this.activityLog = [];
    }

    addDinosaur(dinosaur) {
        if (this.dinosaurs.length >= this.maxCapacity) {
            console.error("Erreur : Enclos plein, impossible d'ajouter un dinosaure.");
            return;
        }
        if (!dinosaur.name) {
            console.error("Erreur : Le dinosaure doit avoir un nom valide.");
            return;
        }
        this.dinosaurs.push(dinosaur);
        this.activityLog.push(`Ajout de ${dinosaur.name} à l'enclos ${this.id}`);
        console.log(`${dinosaur.name} a été ajouté à l'enclos ${this.id}.`);
    }

    removeDinosaur(dinoName) {
        const index = this.dinosaurs.findIndex(dino => dino.name === dinoName);
        if (index !== -1) {
            this.activityLog.push(`Retrait de ${this.dinosaurs[index].name} de l'enclos ${this.id}`);
            console.log(`${this.dinosaurs[index].name} a été retiré.`);
            this.dinosaurs.splice(index, 1);
        } else {
            console.error(`Erreur : Aucun dinosaure nommé ${dinoName} trouvé.`);
        }
    }

    listDinosaurs() {
        console.log(`Dinosaures dans l'enclos ${this.id} :`);
        this.dinosaurs.forEach(dino => dino.displayInfo());
    }

    viewActivityLog() {
        console.log(`Historique des activités pour l'enclos ${this.id} :`);
        this.activityLog.forEach(log => console.log(`- ${log}`));
    }
}

// Système de Maintenance
class Maintenance {
    constructor(technician, task, enclosureId) {
        this.technician = technician;
        this.task = task;
        this.enclosureId = enclosureId;
    }

    performMaintenance() {
        console.log(`Le technicien ${this.technician} effectue la tâche '${this.task}' dans l'enclos ${this.enclosureId}.`);
    }
}

// Génération de rapport en JSON
function generateReport(enclosures) {
    const report = enclosures.map(enclosure => ({
        id: enclosure.id,
        dinosaurs: enclosure.dinosaurs.map(dino => ({
            name: dino.name,
            species: dino.species,
            status: dino.status
        }))
    }));

    console.log("Rapport JSON :", JSON.stringify(report, null, 2));
}

// Exemple d'utilisation
const enclosure1 = new Enclosure(1, 500, "Nord", 3);
const dino1 = new Herbivore("Brachy", "Brachiosaure", 10, 15000, "Feuilles", "Plaine");
const dino2 = new Carnivore("Rexy", "T-Rex", 7, 8000, "Tricératops", "Expert");

enclosure1.addDinosaur(dino1);
enclosure1.addDinosaur(dino2);
enclosure1.listDinosaurs();

dino2.hunt();
dino1.eatPlant();

dino2.status = "malade";
dino2.heal();

enclosure1.removeDinosaur("Brachy");
enclosure1.listDinosaurs();

const maintenance1 = new Maintenance("John", "Réparation des clôtures", 1);
maintenance1.performMaintenance();

enclosure1.viewActivityLog();

generateReport([enclosure1]);
