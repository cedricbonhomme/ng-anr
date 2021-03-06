(function () {

    angular
        .module('AnrModule')
        .factory('ThreatService', [ '$resource', '$rootScope', 'MassDeleteService', ThreatService ]);

    function ThreatService($resource, $rootScope, MassDeleteService) {
        var self = this;

        var anr = $rootScope.OFFICE_MODE == "FO" ? "client-anr/:urlAnrId/" : "";

        var makeResource = function () {
            self.ThreatResource = $resource('api/' + anr + 'threats/:threatId', {
                    threatId: '@uuid',
                    urlAnrId: $rootScope.getUrlAnrId()
                },
                {
                    'update': {
                        method: 'PUT'
                    },
                    'patch': {
                        method: 'PATCH'
                    },
                    'query': {
                        isArray: false
                    }
                });
            self.ThreatThemeResource = $resource('api/' + anr + 'themes/:themeId', {
                    themeId: '@id',
                    urlAnrId: $rootScope.getUrlAnrId()
                },
                {
                    'update': {
                        method: 'PUT'
                    },
                    'patch': {
                        method: 'PATCH'
                    },
                    'query': {
                        isArray: false
                    }
                });
        }
        makeResource();

        // Threats
        var getThreats = function (params) {
            return self.ThreatResource.query(params).$promise;
        };

        var getThreat = function (id) {
            return self.ThreatResource.query({threatId: id}).$promise;
        };

        var createThreat = function (params, success, error) {
            new self.ThreatResource(params).$save(success, error);
        };

        var updateThreat = function (params, success, error) {
            self.ThreatResource.update(params, success, error);
        };

        var deleteThreat = function (id, success, error) {
            self.ThreatResource.delete({threatId: id}, success, error);
        };

        var deleteMassThreat = function (ids, success, error) {
            if ($rootScope.OFFICE_MODE == 'FO') {
                MassDeleteService.deleteMass('api/client-anr/' + $rootScope.getUrlAnrId() + '/threats', ids, success, error);
            } else {
                MassDeleteService.deleteMass('api/threats', ids, success, error);
            }
        };

        var patchThreat = function (id, params, success, error) {
            self.ThreatResource.patch({threatId: id}, params, success, error);
        };


        // Themes
        var getThemes = function (params) {
            return self.ThreatThemeResource.query(params).$promise;
        };

        var getTheme = function (id) {
            return self.ThreatThemeResource.query({themeId: id}).$promise;
        };

        var createTheme = function (params, success, error) {
            new self.ThreatThemeResource(params).$save(success, error);
        };

        var updateTheme = function (params, success, error) {
            self.ThreatThemeResource.update(params, success, error);
        };

        var deleteTheme = function (id, success, error) {
            self.ThreatThemeResource.delete({themeId: id}, success, error);
        };

        var patchTheme = function (id, params, success, error) {
            self.ThreatThemeResource.patch({themeId: id}, params, success, error);
        }


        return {
            makeResource: makeResource,

            getThreats: getThreats,
            getThreat: getThreat,
            createThreat: createThreat,
            deleteThreat: deleteThreat,
            deleteMassThreat: deleteMassThreat,
            updateThreat: updateThreat,
            patchThreat: patchThreat,

            getThemes: getThemes,
            getTheme: getTheme,
            createTheme: createTheme,
            deleteTheme: deleteTheme,
            updateTheme: updateTheme,
            patchTheme: patchTheme
        };
    }

})
();
