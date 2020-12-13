export const questions = [
    // name of the app
    {
        type: 'input',
        name: 'appName',
        message: `What's the name of you app?`,
        validate: function (value: any) {
            let pass = value.length < 40 ? true : false
            if (pass) return true
            return "name should be less than 40 characters"
        }
    },

    // framework
    {
        type: 'list',
        name: 'backFramework',
        message: 'Please choose your backend framework',
        choices: ['express', 'nestjs'],
    },

    // language
    {
        type: 'expand',
        name: 'language',
        message: 'What language you want to choose?',
        choices: [
            {
                key: 'j',
                name: 'Javascript',
                value: 'javascript',
            },
            {
                key: 't',
                name: 'Typescript',
                value: 'typescript',
            },
        ],
        when: function (answers: any) {
            return answers.backFramework !== "nestjs"
        }
    },

    // database
    {
        type: 'expand',
        name: 'database',
        message: 'What database do you want to use?',
        choices: [
            {
                key: 'p',
                name: 'PostgreSQL',
                value: 'postgres',
            },
            {
                key: 'm',
                name: 'MongoDB',
                value: 'mongodb',
            },
        ],
    },
]