"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	return {
		participleLike: participleLike,
		otherAuxiliaries: otherAuxiliaries.concat(infinitiveAuxiliaries),

		filteredAuxiliaries: participleLike.concat(otherAuxiliaries),

		infinitiveAuxiliaries: infinitiveAuxiliaries,
		allAuxiliaries: participleLike.concat(otherAuxiliaries, infinitiveAuxiliaries)
	};
};

var participleLike = ["bekommst", "bekommt", "bekamst", "bekommest", "bekommet", "bekämest", "bekämst", "bekämet", "bekämt", "gekriegt", "gehörst", "gehört", "gehörtest", "gehörtet", "gehörest", "gehöret", "erhältst", "erhält", "erhaltet", "erhielt", "erhieltest", "erhieltst", "erhieltet", "erhaltest"];

var otherAuxiliaries = ["werde", "wirst", "wird", "werden", "werdet", "wurde", "ward", "wurdest", "wardst", "wurden", "wurdet", "worden", "werdest", "würde", "würdest", "würden", "würdet", "bekomme", "bekommen", "bekam", "bekamen", "bekäme", "bekämen", "kriege", "kriegst", "kriegt", "kriegen", "kriegte", "kriegtest", "kriegten", "kriegtet", "kriegest", "krieget", "gehöre", "gehören", "gehörte", "gehörten", "erhalte", "erhalten", "erhielten", "erhielte"];

var infinitiveAuxiliaries = ["werden", "bekommen", "kriegen", "gehören", "erhalten"];
