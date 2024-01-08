const assess = require("@robotical/automatic-assessments/lib").assess;
const assessBadges = require("@robotical/automatic-assessments/lib").assessBadges;
const BadgesManager = require("@robotical/automatic-assessments/lib").BadgesManager;
const CodeAssessLib = require("@robotical/code-assess-lib").default;
const Preprocessor = require("@robotical/code-assess-lib").Preprocessor;
const StarProgressTracker = require("@robotical/code-assess-lib").StarProgressTracker;
const DataToStars = require("@robotical/code-assess-lib").DataToStars;

class CodeAssess {
    constructor() {
        // this.assess = assess;
        this.codeAssessLib = new CodeAssessLib();
        // export type PlatformEnum = "web" |"mobile" |"staging" |"dev-mb" |"dev-webapp";
        this.codeAssessLib.platform = "staging";
        // this.assessBadges = assessBadges;
        this.BadgesManager = BadgesManager;
        this.isProjectLoaded = false;
        this.Preprocessor = Preprocessor;
        this.StarProgressTracker = StarProgressTracker;
    }

    setIsProjectLoaded(isLoaded) {
        // only allowing badges scoring if the project is not loaded to avoid students loading the project multiple times/loading others' projects

        setTimeout(() => {
            // perhaps we want to wisen this up by checking if the loaded project has more than say 10 blocks, as sometimes students may load a project with a few blocks 
            try {
                const blocksLength = vm.runtime.targets.reduce((acc, target) => acc + Object.keys(target.blocks._blocks).length, 0);
                if (blocksLength < 10) {
                    this.isProjectLoaded = false;
                }
            } catch (e) {
                this.isProjectLoaded = isLoaded;
            }
        }, 5000);
        this.isProjectLoaded = isLoaded;
    }

    assess(targets) {
        return assess(targets);
    }

    assessBadges(targets) {
        if (!this.isProjectLoaded) {
            const results = assessBadges(targets);
            return { badgesCount: results.badgesCount, hasCountChanged: results.hasChanged };
        }
    }

    hasStarAchieved(badgesCount) {
        // check if the student has achieved any stars in this session
        /**
         * Example of returned data
         {
            "Loops": ["gold", false, false],
            "Functions": [false, false, false],
            "Conditionals": [false, false, false],
            "Data Types": [false, false, false],
            "Operators": [false, false, false],
            "Parallelism": [ false, false],
            "Variables and Lists": [false, false, false]
        }
         */
        const starsData = DataToStars.toStars(badgesCount);
        const achievedStars = this.StarProgressTracker.compareStars(starsData);
        const anyStarAchieved = Object.values(achievedStars).some((stars) => stars.some((star) => star));
        return { achievedStars, anyStarAchieved };
    }
}

module.exports = CodeAssess;