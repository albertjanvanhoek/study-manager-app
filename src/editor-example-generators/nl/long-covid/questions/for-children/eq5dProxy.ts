import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { initEQ5DHealthIndicatorQuestion, SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { ItemEditor } from "../../../../../editor-engine/survey-editor/item-editor";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { SimpleQuestionEditor } from "../../../../../editor-engine/utils/simple-question-editor";


export class EQ5DProxyGroup extends GroupItemEditor {
    constructor(parentKey: string,
        conditions: {
            olderThan7: Expression,
        },
        keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'EQ5D';
        super(parentKey, groupKey);

        this.addItem(
            new EQ5Dy(this.key, {
                groupCondition: conditions.olderThan7,
            }).getItem()
        );

        this.addItem(
            new EQ5DyProxy(this.key, {
                groupCondition: CommonExpressions.not(conditions.olderThan7),
            }).getItem()
        )
        this.addPageBreak();
    }


}


const copyRightText = new Map([
    ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
    ["nl", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation."],
]);


const eq5dCopyright = {
    role: 'footnote', content: generateLocStrings(copyRightText), style: [
        { key: 'className', value: 'fs-small fst-italic text-center' }
    ]
};



class EQ5Dy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Y';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('Q1', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q2('Q2', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q3('Q3', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q4('Q4', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q5('Q5', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q_healthstatus_instructions_def());
        this.addItem(this.Q_healthstatus_def('Q6', isRequired, true));
        // this.addItem(this.Q6('Q6', isRequired));
    }
    useCopyRight(arg0: string, undefined: undefined, isRequired: boolean, useCopyRight: any): import("survey-engine/lib/data_types").SurveyItem {
        throw new Error("Method not implemented.");
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
Zet bij iedere groep in de lijst hieronder een kruisje in het hokje dat het best past bij de gezondheid van je kind zoals je die VANDAAG ervaart.
`]
                    ])
                })]
        })
    }

    Q1(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Mobiliteit (lopen)"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft geen problemen met lopen"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft een beetje problemen met lopen"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft veel problemen met lopen"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q2(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Zelfzorg"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft geen problemen met wassen of aankleden"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft een beetje problemen met wassen of aankleden"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft veel problemen met wassen of aankleden"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q3(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Dagelijkse activiteiten"],
            ]),
            questionSubText: new Map([
                ["nl", "bijv. school, hobby’s, sport, spelen, dingen doen met familie of vrienden"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft geen problemen met zijn/haar dagelijkse activiteiten"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft een beetje problemen met zijn/haar dagelijkse activiteiten"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft veel problemen met zijn/haar dagelijkse activiteiten"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q4(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Pijn/ongemak"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft geen pijn of andere klachten"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft een beetje pijn of andere klachten"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind heeft veel pijn of andere klachten"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q5(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Angst/somberheid"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind is niet angstig of somber"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind is een beetje angstig of somber"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Mijn kind is erg angstig of somber"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    // TODO: remove Q6 because unused
    Q6(itemKey: string, isRequired: boolean) {
        const inputProperties = {
            min: 0,
            max: 100
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.numericSlider({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", `
We willen weten hoe goed of slecht de gezondheid van je kind VANDAAG is.

Deze meetschaal loopt van 0 tot 100.

100 staat voor de beste gezondheid die je je kunt voorstellen. 0 staat voor de slechtste gezondheid die je je kunt voorstellen.

Markeer een X op de meetschaal om aan te geven hoe de gezondheid van je kind VANDAAG is.
                `],
            ]),
            questionSubText: new Map([
                ["nl", `
0 = De slechtste gezondheid die u zich kunt voorstellen
100 = De beste gezondheid die u zich kunt voorstellen
               `],
            ]),
            sliderLabel: new Map([
                ["nl", "Uw gezondheid vandaag"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 100,
        });
    }

    Q_healthstatus_instructions_def() {
        const defaultKey = 'HEALTH_INS'
        const itemKey = [this.key, defaultKey].join('.');
        const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
        editor.addDisplayComponent(
            {
                role: 'bullets', items: [
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "We would like to know how good or bad your health is TODAY."],
                            ["nl", "We willen weten hoe goed of slecht uw gezondheid VANDAAG is."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "This scale is numbered from 0 to 100."],
                            ["nl", "Deze meetschaal loopt van 0 tot 100."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "100 means the "],
                                    ["nl", "100 staat voor de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "best"],
                                    ["nl", "beste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", " health you can imagine."],
                                    ["nl", " gezondheid die u zich kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                    {
                        role: 'text',
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "0 means the "],
                                    ["nl", "0 staat voor de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "worst"],
                                    ["nl", "slechtste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", " health you can imagine."],
                                    ["en", " gezondheid die u zich kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                ]
            }
        )
        return editor.getItem();
    }

    Q_healthstatus_def(itemKey: string, isRequired?: boolean, useCopyRight?: boolean) {
        const simpleEditor = new SimpleQuestionEditor(this.key, itemKey, 1);

        // role: 'eq5d-health-indicator'
        const rg_inner = initEQ5DHealthIndicatorQuestion({
            key: '0',
            role: 'eq5d-health-indicator',
            instructionText: new Map([
                ["en", "Please indicate on the scale how your health is TODAY."],
                ["nl", "Klik op de meetschaal om aan te geven hoe uw gezondheid VANDAAG is."],
            ]),
            valueBoxText: new Map([
                ["en", "YOUR HEALTH TODAY ="],
                ["nl", "UW GEZONDHEID VANDAAG ="],
            ]),
            minHealthText: new Map([
                ["en", "The worst health you can imagine"],
                ["nl", "De slechste gezondheid die u zich kunt voorstellen"],
            ]),
            maxHealthText: new Map([
                ["en", "The best health you can imagine"],
                ["nl", "De beste gezondheid die u zich kunt voorstellen"],
            ]),
        });
        simpleEditor.setResponseGroupWithContent(rg_inner);

        if (isRequired) {
            simpleEditor.addHasResponseValidation();
        }

        if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
        return simpleEditor.getItem();
    }
}


class EQ5DyProxy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'YProxy';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;
        this.addItem(this.groupIntro());
        this.addItem(this.Q1('Q1', undefined, isRequired));
        this.addItem(this.Q2('Q2', undefined, isRequired));
        this.addItem(this.Q3('Q3', undefined, isRequired));
        this.addItem(this.Q4('Q4', undefined, isRequired));
        this.addItem(this.Q5('Q5', undefined, isRequired));
        this.addItem(this.Q_healthstatus_instructions_def());
        this.addItem(this.Q_healthstatus_def('Q6', isRequired, true));
        // this.addItem(this.Q6('Q6', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
Tik bij iedere groep op het ENE hokje dat het best past bij jouw gezondheid VANDAAG.
`]
                    ])
                })]
        })
    }

    Q1(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Beweging (lopen)"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb geen problemen met lopen"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", " Ik heb een beetje problemen met lopen"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb veel problemen met lopen"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q2(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Voor mezelf zorgen"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb geen problemen met wassen of aankleden"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb een beetje problemen met wassen of aankleden"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb veel problemen met wassen of aankleden"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q3(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Dagelijkse activiteiten"],
            ]),
            questionSubText: new Map([
                ["nl", "bijvoorbeeld naar school gaan, hobby’s, sporten, spelen, naar familie of vrienden gaan"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb geen problemen met mijn dagelijkse activiteiten"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb een beetje problemen met mijn dagelijkse activiteiten"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb veel problemen met mijn dagelijkse activiteiten"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q4(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Pijn of andere klachten"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb geen pijn of andere klachten"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb een beetje pijn of andere klachten"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb veel pijn of andere klachten"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q5(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Bezorgd, verdrietig of ongelukkig"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben niet bezorgd, verdrietig of ongelukkig"],
                    ])
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben een beetje bezorgd, verdrietig of ongelukkig"],
                    ])
                },
                {
                    key: 'veel', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben erg bezorgd, verdrietig of ongelukkig"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    // TODO: remove Q6, because unused
    Q6(itemKey: string, isRequired: boolean) {
        const inputProperties = {
            min: 0,
            max: 100
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.numericSlider({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", `
We willen weten hoe goed of slecht je gezondheid VANDAAG is.

Daarvoor hebben we deze genummerde lijn van 0 tot en met 100 getekend.

100 geeft de beste gezondheid aan die je je kunt voorstellen.

0 de slechtste gezondheid aangeeft die je je kunt voorstellen.

Tik op de genummerde lijn om aan te geven hoe goed of slecht jouw gezondheid VANDAAG is.
                `],
            ]),
            questionSubText: new Map([
                ["nl", `
0 = De slechtste gezondheid die je je voor kunt stellen

100 = De beste gezondheid die je je voor kunt stellen
               `],
            ]),
            sliderLabel: new Map([
                ["nl", "Hoe goed is je gezondheid VANDAAG?"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 100,
        });
    }

    Q_healthstatus_instructions_def() {
        const defaultKey = 'HEALTH_INS'
        const itemKey = [this.key, defaultKey].join('.');
        const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
        editor.addDisplayComponent(
            {
                role: 'bullets', items: [
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "We would like to know how good or bad your health is TODAY."],
                            ["nl", "We willen weten hoe goed of slecht je gezondheid VANDAAG is."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "This scale is numbered from 0 to 100."],
                            ["nl", "Daarvoor hebben we deze genummerde lijn van 0 tot en met 100 getekend."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "100 means the "],
                                    ["nl", "100 geeft de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "best"],
                                    ["nl", "beste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", " health you can imagine."],
                                    ["nl", " gezondheid die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                    {
                        role: 'text',
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "0 means the "],
                                    ["nl", "0 geeft de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", "worst"],
                                    ["nl", "slechtste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["en", " health you can imagine."],
                                    ["en", " gezondheid die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                ]
            }
        )
        return editor.getItem();
    }

    Q_healthstatus_def(itemKey: string, isRequired?: boolean, useCopyRight?: boolean) {
        const simpleEditor = new SimpleQuestionEditor(this.key, itemKey, 1);

        // role: 'eq5d-health-indicator'
        const rg_inner = initEQ5DHealthIndicatorQuestion({
            key: '0',
            role: 'eq5d-health-indicator',
            instructionText: new Map([
                ["en", "Please indicate on the scale how your health is TODAY."],
                ["nl", "Tik op de genummerde lijn om aan te geven hoe goed of slecht jouw gezondheid VANDAAG is."],
            ]),
            valueBoxText: new Map([
                ["en", "YOUR HEALTH TODAY ="],
                ["nl", "Hoe goed is je gezondheid VANDAAG? "],
            ]),
            minHealthText: new Map([
                ["en", "The worst health you can imagine"],
                ["nl", "De slechste gezondheid die je je voor kunt stellen"],
            ]),
            maxHealthText: new Map([
                ["en", "The best health you can imagine"],
                ["nl", "De beste gezondheid die je je voor kunt stellen"],
            ]),
        });
        simpleEditor.setResponseGroupWithContent(rg_inner);

        if (isRequired) {
            simpleEditor.addHasResponseValidation();
        }

        if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
        return simpleEditor.getItem();
    }
}
