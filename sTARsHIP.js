class Starship {
    constructor(phaserCharge_initial, numberOfPhotonTorpedos, energyPerPhotonTorpedo,
                shieldEnergy_initial, FleetDesignation) {
        this.phaserCharge_initial = phaserCharge_initial;
        this.numberOfPhotonTorpedos = numberOfPhotonTorpedos;
        this.energyPerPhotonTorpedo = energyPerPhotonTorpedo;
        this.shieldEnergy_initial = shieldEnergy_initial;
        this.FleetDesignation = FleetDesignation;
        this.phaserCharge = this.phaserCharge_initial;
        this.shieldEnergy = this.shieldEnergy_initial;
        this.destroyed = false;
    }

    reportStatus() {
        return this.FleetDesignation;
    }

    firePhasers(targetShip, energyLevel) {
        if (energyLevel > this.phaserCharge) {
            this.phaserCharge = 0;
            return "Insufficient phaser charge.";
        }
        else if (this.destroyed) {
            return "Ship is destroyed.";
        }
        else {
            targetShip.takeDamage(energyLevel);
            this.phaserCharge -= energyLevel;
            return `Firing phasers with ${energyLevel} energy.`;
        }
    }
    

    

    
    firePhotonTorpedo(targetShip) {
        if (this.numberOfPhotonTorpedos <= 0) {
            return "No photon torpedoes remaining.";
        }
        else if (this.destroyed) {
            return "Ship is destroyed.";
        }
        else {
            let photonTorpedoAttackStrength = this.energyPerPhotonTorpedo;
            targetShip.takeDamage(photonTorpedoAttackStrength);
            this.numberOfPhotonTorpedos -= 1;
            return "Firing photon torpedo.";
        }
    }

    takeDamage(damageAmount) {
        if (this.destroyed) {
            return "Ship is already destroyed.";
        }
        else {
            this.shieldEnergy -= damageAmount;
            if (this.shieldEnergy < 0) {
                this.shieldEnergy = 0;
            }
            if (this.shieldEnergy === 0) {
                this.destroyed = true;
                return "Ship is destroyed.";
            }
            else {
                return `Ship has ${this.shieldEnergy} shield energy remaining.`;
            }
        }
    }

    reportShieldStrength() {
        if (this.destroyed) {
            return "Ship is destroyed.";
        }
        else {
            return `Shield strength is ${this.shieldEnergy}.`;
        }
    }
}
var FederationOrderOfBattle = []; 
var RomulanOrderOfBattle = [];

// make 10 Federation Ships
// make 10 Federation Ships
for (let counter = 0; counter < 10; counter++) {
    FederationOrderOfBattle[counter] = new Starship(
        10000,
        25, 
        25,                
        10000, 
        "Starfleet");
    console.log(FederationOrderOfBattle[counter].reportStatus());
}

// make 10 Romulan Ships
for (let counter = 0; counter < 10; counter++) {
    RomulanOrderOfBattle[counter] = new Starship(
        7200,
        50, 
        20,
        14000, 
        "Romulan Star Empire");
    console.log(RomulanOrderOfBattle[counter].reportStatus());
}

// randomly choose two ships to engage
const shipIndex1 = Math.floor(Math.random() * 10);
const shipIndex2 = Math.floor(Math.random() * 10);
const ship1 = FederationOrderOfBattle[shipIndex1];
const ship2 = RomulanOrderOfBattle[shipIndex2];

// engage the ships until one side is destroyed
while (FederationOrderOfBattle.some(ship => !ship.destroyed) && RomulanOrderOfBattle.some(ship => !ship.destroyed)) {
    // choose a random ship from each side
    const shipIndex1 = Math.floor(Math.random() * 10);
    const shipIndex2 = Math.floor(Math.random() * 10);
    const ship1 = FederationOrderOfBattle[shipIndex1];
    const ship2 = RomulanOrderOfBattle[shipIndex2];
    
    // if both ships are already destroyed, go back to the beginning of the loop
    if (ship1.destroyed && ship2.destroyed) {
        continue;
    }
    
    // determine which ship should attack first
    let attackingShip, defendingShip;
    if (Math.random() < 0.5) {
        attackingShip = ship1;
        defendingShip = ship2;
    } else {
        attackingShip = ship2;
        defendingShip = ship1;
    }
    
    // perform the attack
    if (attackingShip.numberOfPhotonTorpedos > 0 && Math.random() < 0.5) {
        // fire photon torpedo
        console.log(`${attackingShip.FleetDesignation} ship fires photon torpedo.`);
        defendingShip.takeDamage(attackingShip.energyPerPhotonTorpedo);
        attackingShip.numberOfPhotonTorpedos--;
    } else {
        // fire phasers
        console.log(`${attackingShip.FleetDesignation} ship fires phasers with ${attackingShip.phaserCharge} energy.`);
        defendingShip.takeDamage(Math.floor(Math.random() * attackingShip.phaserCharge));
        attackingShip.phaserCharge = 0;
    }
    
    // check if defending ship is destroyed
    if (defendingShip.destroyed) {
        console.log(`${defendingShip.FleetDesignation} ship is destroyed.`);
	break;
    } else {
        console.log(`${defendingShip.FleetDesignation} ship has ${defendingShip.shieldEnergy} shield energy remaining.`);
    }
}

// determine the winner
if (FederationOrderOfBattle.some(ship => !ship.destroyed)) {
    console.log("Federation wins!");
} else {
    console.log("Romulans win!");
}
