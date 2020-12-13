export interface DependenciesInterface {
    express?: string
    mongoose?: string
    pg?: string
    "pg-hstore"?: string
    sequelize?: string
    mysql2?: string
}

export interface DevDependenciesInterface {
    nodemon: string
    "ts-node"?: string
    typescript?: string
}

export interface ScriptsInterface {
    "build"?: string,
    "start:js"?: string,
    "start:ts"?: string,
    "start"?: string,
}

export interface PackageJson {
    name: string
    version: string
    description: string
    main: string
    repository: string
    license: string
    scripts: ScriptsInterface
    // 
    dependencies: DependenciesInterface
    // 
    devDependencies: DevDependenciesInterface

}