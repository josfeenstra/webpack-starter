const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// setup webpack using the ts-loader
module.exports = (env) => {
    let pack = {
        entry: "./src/index.ts",
        module: {
            rules: [
                {
                    // explain how to compile src
                    test: /\.ts$/,
                    use: "ts-loader",
                    include: [path.resolve(__dirname, "src")],
                },
            ],
        },
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "public"),
        },
        devServer: {
            filename: "index.js",
            lazy: true,
            contentBase: path.join(__dirname, "public"),
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_fnames: true,
                    },
                }),
            ],
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
    };

    if (env.eval === "dev") {
        pack.devtool = "eval-source-map";
    }

    return pack;
};
