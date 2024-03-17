const path = require('path');

const { getDefaultConfig } = require('@expo/metro-config');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const modules = [];

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	...defaultConfig,

	projectRoot: __dirname,
	watchFolders: [],

	// We need to make sure that only one version is loaded for peerDependencies
	// So we block them at the root, and alias them to the versions in example's node_modules
	resolver: {
		...defaultConfig.resolver,
		unstable_enablePackageExports: true,

		blacklistRE: exclusionList(
			modules.map(
				(m) => new RegExp(`^${escape(require.resolve(m))}\\/.*$`),
			),
		),

		extraNodeModules: modules.reduce((acc, name) => {
			acc[name] = require.resolve(name);

			return acc;
		}, {}),
	},
};

const projectRoot = __dirname;
// 1. Watch all files within the monorepo

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// config.resolver.disableHierarchicalLookup = true;

module.exports = config;
