import fs from 'fs/promises'
import { exec } from 'child_process'
import ora from 'ora'

import { MainData } from 'src/types/interfaces/mainData'
import {
    BackFrameworkType,
    ProgrammingLanguageType,
    DatabaseType,
    PackageJson,
    
} from '../types'

export class Application {

    private mainData: MainData
    private packageJson: PackageJson
    private AppDir: string

    constructor(
        private appName: string,
        private backFramework: BackFrameworkType,
        private programmingLanguage: ProgrammingLanguageType,
        private database: DatabaseType,
        private Dirname: string
    ) {
        this.mainData = {
            appName: this.appName,
            backFramework: this.backFramework,
            programmingLanguage: this.programmingLanguage,
            database: this.database,
        }
        
    }

    // GETTERS SETTERS
    get getAppName(): string {
        return this.appName
    }

    set setAppName(appName: string) {
        this.appName = appName
    }

    get getBackFramework(): BackFrameworkType {
        return this.backFramework
    }

    set setBackFramework(backFramework: BackFrameworkType) {
        this.backFramework = backFramework
    }

    get getProgrammingLanguage(): ProgrammingLanguageType {
        return this.programmingLanguage
    }

    set setProgrammingLanguage(programmingLanguage: ProgrammingLanguageType) {
        this.programmingLanguage = programmingLanguage
    }

    get getDatabase(): DatabaseType {
        return this.database
    }

    set setDatabase(database: DatabaseType) {
        this.database = database
    }
    // END GETTERS SETTERS

    // create app directory based on app name
    async createAppDir() {
        try {
            this.AppDir = `${this.Dirname}/out`
            await fs.mkdir(this.AppDir)
            await fs.mkdir(`${this.AppDir}/src`)
            await fs.writeFile(`${this.AppDir}/src/index.js`, "console.log('Hello world');")
            
        } catch (error) {
            return error
        }
    }

    // create package.json file and fill it with data and dependencies
    async createPackageJsonFile() {
        
        // generate and refactor package.json based on instance properties
        const packageJsonObj = this.CreatePkg(this.mainData)
        this.packageJson = packageJsonObj

        try {
            await fs.writeFile(`${this.AppDir}/package.json`, JSON.stringify(this.packageJson))
        } catch (error) {
            return error
        }
    }

    // make env ready for typescript
    async createTsEnvironment() {
        // tsconfig file
        if(this.programmingLanguage === "typescript") {
            try {
                await fs.writeFile(`${this.AppDir}/teconfig.json`, this.generateTsConfig())
            } catch (error) {
                return error
            }
        }
    }

    // install dependencies
    async installDependencies() {
        // run commands on terminal for installing 
        exec(`cd ${this.AppDir} && npm install`, (error, _stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Successfully created`);
                return;
            }
            console.log(`Successfully created`);
        })
    }


    CreatePkg = (mainData: MainData) => {
        const { 
            appName, 
            backFramework, 
            programmingLanguage,
            database, 
        } = mainData
    
        const obj: PackageJson = {
            name: appName,
            version: "1.0.0",
            description: "welcome to my app!",
            main: "index.js",
            repository: "put your repository here",
            license: "ISC",
            scripts: {},
            dependencies: {},
            devDependencies: {
                nodemon: "",
            }
        }
    
        if (backFramework === "express") {
            // dependenciesObj.express = "4.17.1"
            obj.dependencies.express = "4.17.1"
        }
    
        if (programmingLanguage === "javascript") {
            // js scripts
            // scriptsObj.start = "node src/index.js"
            obj.scripts.start = "node src/index.js"
    
        } else if (programmingLanguage === "typescript") {
            // ts scripts
            obj.scripts.build = "tsc"
            obj.scripts['start:js'] = "node dist/index.js"
            obj.scripts['start:ts'] = "ts-node src/index.ts"
            obj.scripts.start = "npm run build && npm run start"
    
            // ts dev dependencies
            obj.devDependencies['ts-node'] = "^9.1.1"
            obj.devDependencies.typescript = "^4.1.3"
        }
    
        if (database === "mongodb") {
            obj.dependencies.mongoose = "5.11.7"
    
        } else if (database === "postgres") {
            obj.dependencies.sequelize = "6.3.5"
            obj.dependencies.pg = "8.5.1"
            obj.dependencies['pg-hstore'] = "2.3.3"
    
        } else if (database === "mysql") {
            obj.dependencies.sequelize = "6.3.5"
            obj.dependencies.mysql2 = "2.2.5"
        }
    
        return obj
    }


    generateTsConfig() {
        return `{
            "compilerOptions": {
              "target": "es5",
              "module": "commonjs",
              "lib": [
                "dom",
                "es6",
                "es2017",
                "esnext.asynciterable"
              ],
              "skipLibCheck": true,
              "sourceMap": true,
              "outDir": "./dist",
              "moduleResolution": "node",
              "removeComments": true,
              "noImplicitAny": true,
              "strictNullChecks": true,
              "strictFunctionTypes": true,
              "noImplicitThis": true,
              "noUnusedLocals": false,
              "noUnusedParameters": true,
              "noImplicitReturns": true,
              "noFallthroughCasesInSwitch": true,
              "allowSyntheticDefaultImports": true,
              "esModuleInterop": true,
              "emitDecoratorMetadata": true,
              "experimentalDecorators": true,
              "resolveJsonModule": true,
              "baseUrl": "."
            },
            "exclude": [
              "node_modules"
            ],
            "include": [
              "./src/**/*.tsx",
              "./src/**/*.ts"
            ]
          }`
    }

}