import {
    BackFrameworkType, 
    ProgrammingLanguageType, 
    DatabaseType
} from '..'

export interface MainData {
    appName: string
    backFramework: BackFrameworkType
    programmingLanguage: ProgrammingLanguageType
    database: DatabaseType
}