/**
 * CodeAssess API
 */

const CodeAssessLib = require("@robotical/code-assess-lib");
const AssessmentLib = require("@robotical/automatic-assessments/lib");

class CodeAssess {

    constructor() {
        this.codeAssessLib = CodeAssessLib;
        this.assessmentLib = AssessmentLib;
        this.isProjectLoaded = false;
    }

    assessBadges(targets) {
        if (!this.isProjectLoaded) {
            const assessBadges = this.assessmentLib.assessBadges;
            const results = assessBadges(targets);
            return { badgesCount: results.badgesCount, hasCountChanged: results.hasChanged };
        }
    }

    setIsProjectLoaded(isLoaded) {
        // only allowing badges scoring if the project is not loaded to avoid students loading the project multiple times/loading others' projects

        // setTimeout(() => {
        //     // perhaps we want to wisen this up by checking if the loaded project has more than say 10 blocks, as sometimes students may load a project with a few blocks 
        //     try {
        //         const blocksLength = vm.runtime.targets.reduce((acc, target) => acc + Object.keys(target.blocks._blocks).length, 0);
        //         if (blocksLength < 10) {
        //             this.isProjectLoaded = false;
        //         }
        //     } catch (e) {
        //         this.isProjectLoaded = isLoaded;
        //     }
        // }, 5000);
        this.isProjectLoaded = isLoaded;
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
        const DataToStars = this.codeAssessLib.DataToStars;
        const StarProgressTracker = this.codeAssessLib.StarProgressTracker;
        const starsData = DataToStars.toStars(badgesCount);
        const achievedStars = StarProgressTracker.compareStars(starsData);
        const anyStarAchieved = Object.values(achievedStars).some((stars) => stars.some((star) => star));
        return { achievedStars, anyStarAchieved };
    }
}


module.exports = CodeAssess;
