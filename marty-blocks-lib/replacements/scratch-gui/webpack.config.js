const defaultsDeep = require("lodash.defaultsdeep");
var path = require("path");
var webpack = require("webpack");

// Plugins
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const TerserPlugin = require('terser-webpack-plugin');

// PostCss
var autoprefixer = require("autoprefixer");
var postcssVars = require("postcss-simple-vars");
var postcssImport = require("postcss-import");

const STATIC_PATH = process.env.STATIC_PATH || "/static";

const base = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'false' : 'source-map',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    contentBase: path.resolve(__dirname, "build"),
    host: "0.0.0.0",
    port: process.env.PORT || 8601,
  },
  output: {
    library: "GUI",
    filename: "[name].js",
    chunkFilename: "chunks/[name].js",
  },
  externals: {
    React: "react",
    ReactDOM: "react-dom",
  },
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
          /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
          /node_modules[\\/]pify/,
          /node_modules[\\/]@vernier[\\/]godirect/,
        ],
        options: {
          // Explicitly disable babelrc so we don't cache various config
          // in much lower dependencies.
          babelrc: false,
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            '@babel/plugin-transform-async-to-generator',
            "@babel/plugin-proposal-object-rest-spread",
            [
              "react-intl",
              {
                messagesDir: "./translations/messages/",
              },
            ],
          ],
          presets: [
            ["@babel/preset-env", { exclude: ["transform-regenerator"] }],
            "@babel/preset-react",
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: /prism-okaidia\.css$/, // Exclude Prism styles from CSS Modules
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64:5]",
              camelCase: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: function () {
                return [postcssImport, postcssVars, autoprefixer];
              },
            },
          },
        ],
      },
      {
        test: /\.hex$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 16 * 1024
          }
        }]
      },
      {
        test: /prism-okaidia\.css$/, // Only target prism-okaidia.css
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2017, 
          compress: {
            drop_console: false, 
          },
          format: {
            comments: false, 
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/scratch-blocks/media',
          to: 'static/blocks-media/default'
        },
        {
          from: 'node_modules/scratch-blocks/media',
          to: 'static/blocks-media/high-contrast'
        },
        {
          from: 'src/lib/themes/high-contrast/blocks-media',
          to: 'static/blocks-media/high-contrast',
          force: true
        }
      ]
    })
  ],
};

if (!process.env.CI) {
  base.plugins.push(new webpack.ProgressPlugin());
}

module.exports = [
  // to run editor examples
  defaultsDeep({}, base, {
    entry: {
      "lib.min": ["react", "react-dom"],
      gui: "./src/playground/index.jsx",
      blocksonly: "./src/playground/blocks-only.jsx",
      compatibilitytesting: "./src/playground/compatibility-testing.jsx",
      player: "./src/playground/player.jsx",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
    },
    externals: {
      React: "react",
      ReactDOM: "react-dom",
    },
    module: {
      rules: base.module.rules.concat([
        {
          test: /\.(svg|png|wav|mp3|gif|jpg)$/,
          loader: 'url-loader',
          options: {
            outputPath: "static/assets/",
          },
        },
      ]),
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        name: "lib.min",
      },
      runtimeChunk: {
        name: "lib.min",
      },
    },
    plugins: base.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        'process.env.DEBUG': Boolean(process.env.DEBUG),
        'process.env.GA_ID': `"${process.env.GA_ID || 'UA-000000-01'}"`
      }),
      new HtmlWebpackPlugin({
        chunks: ["lib.min", "gui"],
        template: "src/playground/index.ejs",
        title: "Marty the Robot - MartyBlocks",
        sentryConfig: process.env.SENTRY_CONFIG
          ? '"' + process.env.SENTRY_CONFIG + '"'
          : null,
      }),
      new HtmlWebpackPlugin({
        chunks: ["lib.min", "blocksonly"],
        template: "src/playground/index.ejs",
        filename: "blocks-only.html",
        title: "Marty the Robot - MartyBlocks: Blocks Only Example",
      }),
      new HtmlWebpackPlugin({
        chunks: ["lib.min", "compatibilitytesting"],
        template: "src/playground/index.ejs",
        filename: "compatibility-testing.html",
        title: "Marty the Robot - MartyBlocks: Compatibility Testing",
      }),
      new HtmlWebpackPlugin({
        chunks: ["lib.min", "player"],
        template: "src/playground/index.ejs",
        filename: "player.html",
        title: "Marty the Robot - MartyBlocks: Player Example",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "static",
            to: "static",
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/scratch-blocks/media",
            to: "static/blocks-media",
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "extensions/**",
            to: "static",
            context: "src/examples",
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "extension-worker.{js,js.map}",
            context: "node_modules/scratch-vm/dist/web",
          },
        ],
      }),
    ]),
  }),
].concat(
  process.env.NODE_ENV === "production" || process.env.BUILD_MODE === "dist"
    ? // export as library
    defaultsDeep({}, base, {
      target: "web",
      entry: {
        "scratch-gui": "./src/index.js",
      },
      output: {
        libraryTarget: "umd",
        path: path.resolve("dist"),
        publicPath: `${STATIC_PATH}/`,
      },
      externals: {
        react: "react",
        "react-dom": "react-dom",
      },
      module: {
        rules: base.module.rules.concat([
          {
            test: /\.(svg|png|wav|mp3|gif|jpg)$/,
            loader: 'url-loader',
            options: {
              limit: 2048,
              outputPath: "static/assets/",
              publicPath: `${STATIC_PATH}/assets/`,
            },
          },
        ]),
      },
      plugins: base.plugins.concat([
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "node_modules/scratch-blocks/media",
              to: "static/blocks-media",
            },
            {
              from: 'extension-worker.{js,js.map}',
              context: 'node_modules/scratch-vm/dist/web',
              noErrorOnMissing: true
            }
          ],
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "extension-worker.{js,js.map}",
              context: "node_modules/scratch-vm/dist/web",
            },
          ],
        }),
        // Include library JSON files for scratch-desktop to use for downloading
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "src/lib/libraries/*.json",
              to: "libraries",
              flatten: true,
            },
          ],
        }),
      ]),
    })
    : []
);
