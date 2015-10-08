module GameFromScratch {
    export class GameManager {
      
        private static _instance: GameManager =  new GameManager();


        constructor() {
            if (GameManager._instance) {
                throw new Error("Error:Instantiation failed, use singleton Mode");
            }
            GameManager._instance = this;
        }

        public static getInstance(): GameManager
        {
            return GameManager._instance;
        }



        update() {
        

        }


    }
} 