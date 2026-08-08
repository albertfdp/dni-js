# Changelog

## [1.0.0](https://github.com/albertfdp/dni-js/compare/v0.2.1...v1.0.0) (2026-08-08)


### ⚠ BREAKING CHANGES

* `dni()` no longer accepts NIE bodies and `nie()` no longer accepts DNI bodies — both return `null` instead of the formatted document, so callers who passed either shape to whichever function was convenient must now call the one matching the document. `nie()` also rejects `number` arguments at the type level. Input handling in `isValid()` and `normalize()` is unchanged, except that lowercase NIEs now validate where they previously did not.
* `dni()`, `nie()` and `normalize()` no longer return a hyphen between the number and its control letter. Callers comparing against `12345678-Z` must compare against `12345678Z` instead. Input handling is unchanged.

### Features

* add dniOrNie as a compatibility shim for 0.2.x callers ([#38](https://github.com/albertfdp/dni-js/issues/38)) ([fd6c4a8](https://github.com/albertfdp/dni-js/commit/fd6c4a89d2517fbfb8e95adacd74e22e37eb9b3c))
* add isDNI/isNIE predicates and make dni()/nie() strict ([#36](https://github.com/albertfdp/dni-js/issues/36)) ([53b0221](https://github.com/albertfdp/dni-js/commit/53b02215f22f8556dc5e375a53e8e17b1f4c4693))
* emit the official unhyphenated DNI/NIE format ([a7bf9d4](https://github.com/albertfdp/dni-js/commit/a7bf9d400581e49e7a04d874512efe6d350dd5a7)), closes [#28](https://github.com/albertfdp/dni-js/issues/28) [#27](https://github.com/albertfdp/dni-js/issues/27)
* ship TypeScript declarations ([cf4d7c2](https://github.com/albertfdp/dni-js/commit/cf4d7c2e0b8596b458563a5334f09af61ab7c9f0))
* ship TypeScript declarations ([18933c4](https://github.com/albertfdp/dni-js/commit/18933c475e56127d8550fc9d0f601e689ee09c42))


### Bug Fixes

* reject a literal pipe as a NIE prefix ([7bd00c2](https://github.com/albertfdp/dni-js/commit/7bd00c2ec1fcabdab1dfd5a8a6d394d8708c9c7b))
* reject a literal pipe as a NIE prefix ([af8c76e](https://github.com/albertfdp/dni-js/commit/af8c76e09f4ff87e85cf83ee7417f2dbd763daa1))
* restore leading zeros stripped from a DNI in normalize ([aeab0d7](https://github.com/albertfdp/dni-js/commit/aeab0d741923bbb6a0d1f35ab0880e3c85c3726d))
* restore leading zeros stripped from a DNI in normalize ([ec5c10e](https://github.com/albertfdp/dni-js/commit/ec5c10e7548db17fd8bb33db34d679690bdf8a5c)), closes [#15](https://github.com/albertfdp/dni-js/issues/15)


### Build System

* restrict the published tarball to the library source ([8a41055](https://github.com/albertfdp/dni-js/commit/8a410558ba600a8c9bda5c9777392bb7612fd16f))
* switch from npm to pnpm ([811d714](https://github.com/albertfdp/dni-js/commit/811d71444085d8d7d727d09c47c3d7840c74700c))
* upgrade eslint 7 -&gt; 10 and migrate to flat config ([81db7f7](https://github.com/albertfdp/dni-js/commit/81db7f79bde12802fbe3a492f92a067213f85bb2))
* upgrade jest 27 -&gt; 30 ([cffe00e](https://github.com/albertfdp/dni-js/commit/cffe00e5f04ff46511f01cfd7d22b6df87dce167))
* upgrade prettier 2 -&gt; 3 ([eb89924](https://github.com/albertfdp/dni-js/commit/eb89924d06ad1b67451afda981e546c54aecdd14))


### Documentation

* add a migration guide from 0.2.x to 1.0.0 ([#40](https://github.com/albertfdp/dni-js/issues/40)) ([7ce1e3d](https://github.com/albertfdp/dni-js/commit/7ce1e3d6a551463743f654cd5e6f2011ad739c9e))
* replace dead travis badge, document the pnpm workflow ([324894e](https://github.com/albertfdp/dni-js/commit/324894e86590b096c4c16f2e40464de9dd016dd6))
* restructure the API reference around an at-a-glance table ([#37](https://github.com/albertfdp/dni-js/issues/37)) ([70e1285](https://github.com/albertfdp/dni-js/commit/70e12851d63232a3f03517e2b12008cd2dd460e2))
