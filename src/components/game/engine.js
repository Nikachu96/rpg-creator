import Phaser from "phaser";

// This function returns a Phaser config object
export function createGameConfig(container, worldData) {
  return {
    type: Phaser.AUTO,
    parent: container, // div ref from GameCanvas
    width: 800,
    height: 500,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: function () {
        // Load assets (tiles, player)
        this.load.image("tiles", "/assets/tiles.png"); // placeholder tiles
        this.load.spritesheet("player", "/assets/player.png", {
          frameWidth: 32,
          frameHeight: 48,
        });
      },
      create: function () {
        // Create the map from JSON data
        const map = this.make.tilemap({ data: worldData.map, tileWidth: 32, tileHeight: 32 });
        const tileset = map.addTilesetImage("tiles");
        map.createLayer(0, tileset, 0, 0);

        // Create player
        this.player = this.physics.add.sprite(100, 100, "player", 0);
        this.player.setCollideWorldBounds(true);

        //
        this.npcs = [];
        worldData.npcs.forEach((npcData) => {
        const npc = this.physics.add.sprite(
            npcData.x * 32 + 16,
            npcData.y * 32 + 16,
            npcData.sprite
        );
        npc.dialogue = npcData.dialogue;
        npc.setImmovable(true);
        this.npcs.push(npc);
        });

        // Set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add SPACE key for interaction
this.interactKey = this.input.keyboard.addKey(
  Phaser.Input.Keyboard.KeyCodes.SPACE
);

// NPC setup
this.npcs = [];

if (worldData.npcs) {
  worldData.npcs.forEach((npcData) => {
    const npc = this.physics.add.sprite(
      npcData.x * 32 + 16, // convert tile x → pixels
      npcData.y * 32 + 16, // convert tile y → pixels
      npcData.sprite
    );
    npc.dialogue = npcData.dialogue;
    npc.setImmovable(true);
    this.npcs.push(npc);
  });
}

// Interaction event
this.interactKey.on("down", () => {
  this.npcs.forEach((npc) => {
    const dist = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      npc.x,
      npc.y
    );

    if (dist < 40) {
      // For now, just show first dialogue line
      alert(npc.dialogue[0]);
    }
  });
});
      },
      update: function () {
        if (!this.player || !this.cursors) return;

        const speed = 150;
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(speed);
        }
      },
    },
  };
}
