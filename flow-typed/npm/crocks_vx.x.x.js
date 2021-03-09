// flow-typed signature: 8748f0eed8ea9eb7c10859f65e707b62
// flow-typed version: <<STUB>>/crocks_v0.12.4/flow_v0.145.0

// internal
declare module 'crocks/internal' {
  import type Pred from 'crocks/core/Pred';

  declare export type Predicate = (any) => boolean;

  declare type PredLike =
    | Predicate
    | Pred

  declare export type NullaryFunction<T: mixed> = () => T;

  declare export type UnaryFunction<T: mixed> = (mixed) => T;
}

declare module 'crocks' {
  declare module.exports: any;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'crocks/All' {
  declare module.exports: any;
}

declare module 'crocks/Any' {
  declare module.exports: any;
}

declare module 'crocks/Arrow' {
  declare module.exports: any;
}

declare module 'crocks/Assign' {
  declare module.exports: any;
}

declare module 'crocks/Async/asyncToPromise' {
  declare module.exports: any;
}

declare module 'crocks/Async/eitherToAsync' {
  declare module.exports: any;
}

declare module 'crocks/Async/firstToAsync' {
  declare module.exports: any;
}

declare module 'crocks/Async' {
  declare module.exports: any;
}

declare module 'crocks/Async/lastToAsync' {
  declare module.exports: any;
}

declare module 'crocks/Async/maybeToAsync' {
  declare module.exports: any;
}

declare module 'crocks/Async/race' {
  declare module.exports: any;
}

declare module 'crocks/Async/resultToAsync' {
  declare module.exports: any;
}

declare module 'crocks/combinators/applyTo' {
  declare module.exports: any;
}

declare module 'crocks/combinators/compose2' {
  declare module.exports: any;
}

declare module 'crocks/combinators/composeB' {
  declare module.exports: any;
}

declare module 'crocks/combinators/constant' {
  declare module.exports: any;
}

declare module 'crocks/combinators/converge' {
  declare module.exports: any;
}

declare module 'crocks/combinators/flip' {
  declare module.exports: any;
}

declare module 'crocks/combinators/identity' {
  declare module.exports: any;
}

declare module 'crocks/combinators' {
  declare module.exports: any;
}

declare module 'crocks/combinators/psi' {
  declare module.exports: any;
}

declare module 'crocks/combinators/substitution' {
  declare module.exports: any;
}

declare module 'crocks/Const' {
  declare module.exports: any;
}

declare module 'crocks/core/_unit' {
  declare module.exports: any;
}

declare module 'crocks/core/apOrFunc' {
  declare module.exports: any;
}

declare module 'crocks/core/array' {
  declare module.exports: any;
}

declare module 'crocks/core/cloneIterable' {
  declare module.exports: any;
}

declare module 'crocks/core/compose' {
  declare module.exports: any;
}

declare module 'crocks/core/curry' {
  declare module.exports: any;
}

declare module 'crocks/core/curryN' {
  declare module.exports: any;
}

declare module 'crocks/core/defineUnion' {
  declare module.exports: any;
}

declare module 'crocks/core/equals' {
  declare module.exports: any;
}

declare module 'crocks/core/flNames' {
  declare module.exports: any;
}

declare module 'crocks/core/hasAlg' {
  declare module.exports: any;
}

declare module 'crocks/core/implements' {
  declare module.exports: any;
}

declare module 'crocks/core/innerConcat' {
  declare module.exports: any;
}

declare module 'crocks/core/inspect' {
  declare module.exports: any;
}

// Predicates
declare module 'crocks/core/isAlt' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isApplicative' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isApply' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isArray' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isBichain' {
  declare module.exports: any;
}

declare module 'crocks/core/isBifunctor' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isChain' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isContravariant' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isDate' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isDefined' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isEmpty' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isExtend' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isFoldable' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isFunction' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isFunctor' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isInteger' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isIterable' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isMap' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isMonad' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isMonoid' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isNil' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isNumber' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isObject' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isPlus' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isPredOrFunc' {
  declare module.exports: any;
}

declare module 'crocks/core/isProfunctor' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isPromise' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isSame' {
  declare module.exports: any;
}

declare module 'crocks/core/isSameType' {
  declare module.exports: any;
}

declare module 'crocks/core/isSemigroup' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isSemigroupoid' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isString' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isSymbol' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/core/isTypeRepOf' {
  declare module.exports: any;
}

declare module 'crocks/core/List' {
  declare module.exports: any;
}

declare module 'crocks/core/Maybe' {
  declare module.exports: any;
}

declare module 'crocks/core/mconcatMap' {
  declare module.exports: any;
}

declare module 'crocks/core/object' {
  declare module.exports: any;
}

declare module 'crocks/core/once' {
  declare module.exports: any;
}

declare module 'crocks/core/Pair' {
  declare module.exports: any;
}

declare module 'crocks/core/Pred' {
  import type { UnaryFunction } from 'crocks/internal';

  declare class Pred {
    constructor(fn: UnaryFunction<boolean>): Pred;
    concat(val: Pred): Pred;
    contramap(fn: UnaryFunction<>): Pred;
    valueOf(): UnaryFunction<boolean>;
    runWith(val: mixed): boolean;
    static empty(): Pred;
  }

  declare module.exports: typeof Pred;
}

declare module 'crocks/core/predOrFunc' {
  declare module.exports: any;
}

declare module 'crocks/core/type' {
  declare module.exports: any;
}

declare module 'crocks/core/types' {
  declare module.exports: any;
}

declare module 'crocks/core/Unit' {
  declare module.exports: any;
}

declare module 'crocks/dist/crocks' {
  declare module.exports: any;
}

declare module 'crocks/dist/crocks.min' {
  declare module.exports: any;
}

declare module 'crocks/Either/firstToEither' {
  declare module.exports: any;
}

declare module 'crocks/Either' {
  declare module.exports: any;
}

declare module 'crocks/Either/lastToEither' {
  declare module.exports: any;
}

declare module 'crocks/Either/maybeToEither' {
  declare module.exports: any;
}

declare module 'crocks/Either/resultToEither' {
  declare module.exports: any;
}

declare module 'crocks/Endo' {
  declare module.exports: any;
}

declare module 'crocks/Equiv' {
  declare module.exports: any;
}

declare module 'crocks/First/eitherToFirst' {
  declare module.exports: any;
}

declare module 'crocks/First' {
  declare module.exports: any;
}

declare module 'crocks/First/lastToFirst' {
  declare module.exports: any;
}

declare module 'crocks/First/maybeToFirst' {
  declare module.exports: any;
}

declare module 'crocks/First/resultToFirst' {
  declare module.exports: any;
}

declare module 'crocks/helpers/assign' {
  declare module.exports: any;
}

declare module 'crocks/helpers/assoc' {
  declare module.exports: any;
}

declare module 'crocks/helpers/binary' {
  declare module.exports: any;
}

declare module 'crocks/helpers/compose' {
  declare module.exports: any;
}

declare module 'crocks/helpers/composeK' {
  declare module.exports: any;
}

declare module 'crocks/helpers/composeP' {
  declare module.exports: any;
}

declare module 'crocks/helpers/composeS' {
  declare module.exports: any;
}

declare module 'crocks/helpers/curry' {
  declare module.exports: any;
}

declare module 'crocks/helpers/defaultProps' {
  declare module.exports: any;
}

declare module 'crocks/helpers/defaultTo' {
  declare module.exports: any;
}

declare module 'crocks/helpers/dissoc' {
  declare module.exports: any;
}

declare module 'crocks/helpers/fromPairs' {
  declare module.exports: any;
}

declare module 'crocks/helpers/getPathOr' {
  declare module.exports: any;
}

declare module 'crocks/helpers/getPropOr' {
  declare module.exports: any;
}

declare module 'crocks/helpers' {
  declare module.exports: any;
}

declare module 'crocks/helpers/liftA2' {
  declare module.exports: any;
}

declare module 'crocks/helpers/liftA3' {
  declare module.exports: any;
}

declare module 'crocks/helpers/liftN' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mapProps' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mapReduce' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mconcat' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mconcatMap' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mreduce' {
  declare module.exports: any;
}

declare module 'crocks/helpers/mreduceMap' {
  declare module.exports: any;
}

declare module 'crocks/helpers/nAry' {
  declare module.exports: any;
}

declare module 'crocks/helpers/objOf' {
  declare module.exports: any;
}

declare module 'crocks/helpers/omit' {
  declare module.exports: any;
}

declare module 'crocks/helpers/once' {
  declare module.exports: any;
}

declare module 'crocks/helpers/partial' {
  declare module.exports: any;
}

declare module 'crocks/helpers/pick' {
  declare module.exports: any;
}

declare module 'crocks/helpers/pipe' {
  declare module.exports: any;
}

declare module 'crocks/helpers/pipeK' {
  declare module.exports: any;
}

declare module 'crocks/helpers/pipeP' {
  declare module.exports: any;
}

declare module 'crocks/helpers/pipeS' {
  declare module.exports: any;
}

declare module 'crocks/helpers/propOr' {
  declare module.exports: any;
}

declare module 'crocks/helpers/propPathOr' {
  declare module.exports: any;
}

declare module 'crocks/helpers/setPath' {
  declare module.exports: any;
}

declare module 'crocks/helpers/setProp' {
  declare module.exports: any;
}

declare module 'crocks/helpers/tap' {
  declare module.exports: any;
}

declare module 'crocks/helpers/unary' {
  declare module.exports: any;
}

declare module 'crocks/helpers/unit' {
  declare module.exports: any;
}

declare module 'crocks/helpers/unsetPath' {
  declare module.exports: any;
}

declare module 'crocks/helpers/unsetProp' {
  declare module.exports: any;
}

declare module 'crocks/Identity' {
  declare module.exports: any;
}

declare module 'crocks/IO' {
  declare module.exports: any;
}

declare module 'crocks/Last/eitherToLast' {
  declare module.exports: any;
}

declare module 'crocks/Last/firstToLast' {
  declare module.exports: any;
}

declare module 'crocks/Last' {
  declare module.exports: any;
}

declare module 'crocks/Last/maybeToLast' {
  declare module.exports: any;
}

declare module 'crocks/Last/resultToLast' {
  declare module.exports: any;
}

declare module 'crocks/List/arrayToList' {
  declare module.exports: any;
}

declare module 'crocks/List' {
  declare module.exports: any;
}

declare module 'crocks/List/listToArray' {
  declare module.exports: any;
}

declare module 'crocks/List/maybeToList' {
  declare module.exports: any;
}

// and :: ((a -> Boolean) | Pred a) -> ((a -> Boolean) | Pred a) -> a -> Boolean
declare module 'crocks/logic/and' {
  import type { Predicate, PredLike } from 'crocks/internal';

  declare function and(PredLike): ((PredLike) => ((mixed) => boolean))
  declare function and(PredLike, PredLike): ((mixed) => boolean)
  declare function and(PredLike, PredLike, mixed) : boolean

  declare module.exports: typeof and;
}

declare module 'crocks/logic/ifElse' {
  import type { PredLike } from 'crocks/internal';

  // ifElse :: ((a -> Boolean) | Pred a) -> (a -> b) -> (a -> b) -> a -> b
  declare function ifElse<A, B, C>(PredLike): ((A) => B) => ((A) => C) =>
      (A) => A | C;
  declare function ifElse<A, B, C>(PredLike, (A) => B): ((A) => C) =>
      (A) => A | C;
  declare function ifElse<A, B, C>(PredLike, (A) => B, (A) => C): (A) => A | C;

  declare module.exports: typeof ifElse;
}

declare module 'crocks/logic/implies' {
  import type { PredLike } from 'crocks/internal';

  // implies :: ((a -> Boolean) | Pred a) -> ((a -> Boolean) | Pred a) ->
  //     a -> Boolean
  declare function implies<A>(PredLike): (PredLike) => (A) => boolean;
  declare function implies<A>(PredLike, PredLike): (A) => boolean;

  declare module.exports: typeof implies;
}

declare module 'crocks/logic' {
  declare module.exports: any;
}

declare module 'crocks/logic/not' {
  import type { Predicate, PredLike } from 'crocks/internal';

  declare function not(PredLike): Predicate;

  declare module.exports: typeof not;
}

declare module 'crocks/logic/or' {
  import type { Predicate, PredLike } from 'crocks/internal';

  // or :: ((a -> Boolean) | Pred) -> ((a -> Boolean) | Pred) -> a -> Boolean
  declare function or(PredLike): (PredLike) => Predicate;
  declare function or(PredLike, PredLike): Predicate;

  declare module.exports: typeof or;
}

declare module 'crocks/logic/unless' {
  declare module.exports: any;
}

declare module 'crocks/logic/when' {
  import type { PredLike } from 'crocks/internal';

  // when :: ((a -> Boolean) | Pred) -> (a -> a) -> a -> a
  declare function when<A, B>(PredLike): ((A) => B) => (A) => A | B;
  declare function when<A, B>(PredLike, (A) => B): (A) => A | B;

  declare module.exports: typeof when;
}

declare module 'crocks/Max' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/eitherToMaybe' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/find' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/firstToMaybe' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/getPath' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/getProp' {
  declare module.exports: any;
}

declare module 'crocks/Maybe' {
  declare module.exports: $Exports<'crocks/core/Maybe'>;
}

declare module 'crocks/Maybe/lastToMaybe' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/maybeToArray' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/prop' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/propPath' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/resultToMaybe' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/safe' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/safeAfter' {
  declare module.exports: any;
}

declare module 'crocks/Maybe/safeLift' {
  declare module.exports: any;
}

declare module 'crocks/Min' {
  declare module.exports: any;
}

declare module 'crocks/Pair/branch' {
  declare module.exports: any;
}

declare module 'crocks/Pair/fanout' {
  declare module.exports: any;
}

declare module 'crocks/Pair/fst' {
  declare module.exports: any;
}

declare module 'crocks/Pair' {
  declare module.exports: any;
}

declare module 'crocks/Pair/snd' {
  declare module.exports: any;
}

declare module 'crocks/Pair/toPairs' {
  declare module.exports: any;
}

declare module 'crocks/Pair/writerToPair' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/alt' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/ap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/bichain' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/bimap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/both' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/chain' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/coalesce' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/compareWith' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/concat' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/cons' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/contramap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/either' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/empty' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/equals' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/extend' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/filter' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/first' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/fold' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/foldMap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/head' {
  declare module.exports: any;
}

declare module 'crocks/pointfree' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/init' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/last' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/map' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/merge' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/option' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/promap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/reduce' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/reduceRight' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/reject' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/run' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/runWith' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/second' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/sequence' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/swap' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/tail' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/traverse' {
  declare module.exports: any;
}

declare module 'crocks/pointfree/valueOf' {
  declare module.exports: any;
}

declare module 'crocks/Pred' {
  declare module.exports: $Exports<'crocks/core/Pred'>;
}

declare module 'crocks/predicates/hasProp' {
  declare module.exports: any;
}

declare module 'crocks/predicates/hasPropPath' {
  declare module.exports: any;
}

declare module 'crocks/predicates/hasProps' {
  declare module.exports: any;
}

declare module 'crocks/predicates' {
  declare module.exports: any;
}

declare module 'crocks/predicates/isAlt' {
  declare module.exports: $Exports<'crocks/core/isAlt'>;
}

declare module 'crocks/predicates/isAlternative' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isApplicative' {
  declare module.exports: $Exports<'crocks/core/isApplicative'>;
}

declare module 'crocks/predicates/isApply' {
  declare module.exports: $Exports<'crocks/core/isApply'>;
}

declare module 'crocks/predicates/isArray' {
  declare module.exports: $Exports<'crocks/core/isArray'>;
}

declare module 'crocks/predicates/isBichain' {
  declare module.exports: $Exports<'crocks/core/isBichain'>;
}

declare module 'crocks/predicates/isBifunctor' {
  declare module.exports: $Exports<'crocks/core/isBifunctor'>;
}

declare module 'crocks/predicates/isBoolean' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isCategory' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isChain' {
  declare module.exports: $Exports<'crocks/core/isChain'>;
}

declare module 'crocks/predicates/isContravariant' {
  declare module.exports: $Exports<'crocks/core/isContravariant'>;
}

declare module 'crocks/predicates/isDate' {
  declare module.exports: $Exports<'crocks/core/isDate'>;
}

declare module 'crocks/predicates/isDefined' {
  declare module.exports: $Exports<'crocks/core/isDefined'>;
}

declare module 'crocks/predicates/isEmpty' {
  declare module.exports: $Exports<'crocks/core/isEmpty'>;
}

declare module 'crocks/predicates/isExtend' {
  declare module.exports: $Exports<'crocks/core/isExtend'>;
}

declare module 'crocks/predicates/isFalse' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isFalsy' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isFoldable' {
  declare module.exports: $Exports<'crocks/core/isFoldable'>;
}

declare module 'crocks/predicates/isFunction' {
  declare module.exports: $Exports<'crocks/core/isFunction'>;
}

declare module 'crocks/predicates/isFunctor' {
  declare module.exports: $Exports<'crocks/core/isFunctor'>;
}

declare module 'crocks/predicates/isInteger' {
  declare module.exports: $Exports<'crocks/core/isInteger'>;
}

declare module 'crocks/predicates/isIterable' {
  declare module.exports: $Exports<'crocks/core/isIterable'>;
}

declare module 'crocks/predicates/isMap' {
  declare module.exports: $Exports<'crocks/core/isMap'>;
}

declare module 'crocks/predicates/isMonad' {
  declare module.exports: $Exports<'crocks/core/isMonad'>;
}

declare module 'crocks/predicates/isMonoid' {
  declare module.exports: $Exports<'crocks/core/isMonoid'>;
}

declare module 'crocks/predicates/isNil' {
  declare module.exports: $Exports<'crocks/core/isNil'>;
}

declare module 'crocks/predicates/isNumber' {
  declare module.exports: $Exports<'crocks/core/isNumber'>;
}

declare module 'crocks/predicates/isObject' {
  declare module.exports: $Exports<'crocks/core/isObject'>;
}

declare module 'crocks/predicates/isPlus' {
  declare module.exports: $Exports<'crocks/core/isPlus'>;
}

declare module 'crocks/predicates/isProfunctor' {
  declare module.exports: $Exports<'crocks/core/isProfunctor'>;
}

declare module 'crocks/predicates/isPromise' {
  declare module.exports: $Exports<'crocks/core/isPromise'>;
}

declare module 'crocks/predicates/isSame' {
  declare module.exports: any;
}

declare module 'crocks/predicates/isSameType' {
  declare module.exports: $Exports<'crocks/core/isSameType'>;
}

declare module 'crocks/predicates/isSemigroup' {
  declare module.exports: $Exports<'crocks/core/isSemigroup'>;
}

declare module 'crocks/predicates/isSemigroupoid' {
  declare module.exports: $Exports<'crocks/core/isSemigroupoid'>;
}

declare module 'crocks/predicates/isSetoid' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isString' {
  declare module.exports: $Exports<'crocks/core/isString'>;
}

declare module 'crocks/predicates/isSymbol' {
  declare module.exports: $Exports<'crocks/core/isSymbol'>;
}

declare module 'crocks/predicates/isTraversable' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isTrue' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/isTruthy' {
  import type { Predicate } from 'crocks/internal';

  declare module.exports: Predicate;
}

declare module 'crocks/predicates/pathEq' {
  declare module.exports: any;
}

declare module 'crocks/predicates/pathSatisfies' {
  declare module.exports: any;
}

declare module 'crocks/predicates/propEq' {
  declare module.exports: any;
}

declare module 'crocks/predicates/propPathEq' {
  declare module.exports: any;
}

declare module 'crocks/predicates/propPathSatisfies' {
  declare module.exports: any;
}

declare module 'crocks/predicates/propSatisfies' {
  declare module.exports: any;
}

declare module 'crocks/Prod' {
  declare module.exports: any;
}

declare module 'crocks/Reader' {
  declare module.exports: any;
}

declare module 'crocks/Reader/ReaderT' {
  declare module.exports: any;
}

declare module 'crocks/Result/eitherToResult' {
  declare module.exports: any;
}

declare module 'crocks/Result/firstToResult' {
  declare module.exports: any;
}

declare module 'crocks/Result' {
  declare module.exports: any;
}

declare module 'crocks/Result/lastToResult' {
  declare module.exports: any;
}

declare module 'crocks/Result/maybeToResult' {
  declare module.exports: any;
}

declare module 'crocks/Result/tryCatch' {
  declare module.exports: any;
}

declare module 'crocks/Star' {
  declare module.exports: any;
}

declare module 'crocks/State/evalWith' {
  declare module.exports: any;
}

declare module 'crocks/State/execWith' {
  declare module.exports: any;
}

declare module 'crocks/State' {
  declare module.exports: any;
}

declare module 'crocks/Sum' {
  declare module.exports: any;
}

declare module 'crocks/Tuple' {
  declare module.exports: any;
}

declare module 'crocks/Tuple/nmap' {
  declare module.exports: any;
}

declare module 'crocks/Tuple/project' {
  declare module.exports: any;
}

declare module 'crocks/Tuple/tupleToArray' {
  declare module.exports: any;
}

declare module 'crocks/Unit' {
  declare module.exports: any;
}

declare module 'crocks/Writer' {
  declare module.exports: any;
}

declare module 'crocks/Writer/log' {
  declare module.exports: any;
}

declare module 'crocks/Writer/read' {
  declare module.exports: any;
}

// Filename aliases
declare module 'crocks/All/index' {
  declare module.exports: $Exports<'crocks/All'>;
}
declare module 'crocks/All/index.js' {
  declare module.exports: $Exports<'crocks/All'>;
}
declare module 'crocks/Any/index' {
  declare module.exports: $Exports<'crocks/Any'>;
}
declare module 'crocks/Any/index.js' {
  declare module.exports: $Exports<'crocks/Any'>;
}
declare module 'crocks/Arrow/index' {
  declare module.exports: $Exports<'crocks/Arrow'>;
}
declare module 'crocks/Arrow/index.js' {
  declare module.exports: $Exports<'crocks/Arrow'>;
}
declare module 'crocks/Assign/index' {
  declare module.exports: $Exports<'crocks/Assign'>;
}
declare module 'crocks/Assign/index.js' {
  declare module.exports: $Exports<'crocks/Assign'>;
}
declare module 'crocks/Async/asyncToPromise.js' {
  declare module.exports: $Exports<'crocks/Async/asyncToPromise'>;
}
declare module 'crocks/Async/eitherToAsync.js' {
  declare module.exports: $Exports<'crocks/Async/eitherToAsync'>;
}
declare module 'crocks/Async/firstToAsync.js' {
  declare module.exports: $Exports<'crocks/Async/firstToAsync'>;
}
declare module 'crocks/Async/index' {
  declare module.exports: $Exports<'crocks/Async'>;
}
declare module 'crocks/Async/index.js' {
  declare module.exports: $Exports<'crocks/Async'>;
}
declare module 'crocks/Async/lastToAsync.js' {
  declare module.exports: $Exports<'crocks/Async/lastToAsync'>;
}
declare module 'crocks/Async/maybeToAsync.js' {
  declare module.exports: $Exports<'crocks/Async/maybeToAsync'>;
}
declare module 'crocks/Async/race.js' {
  declare module.exports: $Exports<'crocks/Async/race'>;
}
declare module 'crocks/Async/resultToAsync.js' {
  declare module.exports: $Exports<'crocks/Async/resultToAsync'>;
}
declare module 'crocks/combinators/applyTo.js' {
  declare module.exports: $Exports<'crocks/combinators/applyTo'>;
}
declare module 'crocks/combinators/compose2.js' {
  declare module.exports: $Exports<'crocks/combinators/compose2'>;
}
declare module 'crocks/combinators/composeB.js' {
  declare module.exports: $Exports<'crocks/combinators/composeB'>;
}
declare module 'crocks/combinators/constant.js' {
  declare module.exports: $Exports<'crocks/combinators/constant'>;
}
declare module 'crocks/combinators/converge.js' {
  declare module.exports: $Exports<'crocks/combinators/converge'>;
}
declare module 'crocks/combinators/flip.js' {
  declare module.exports: $Exports<'crocks/combinators/flip'>;
}
declare module 'crocks/combinators/identity.js' {
  declare module.exports: $Exports<'crocks/combinators/identity'>;
}
declare module 'crocks/combinators/index' {
  declare module.exports: $Exports<'crocks/combinators'>;
}
declare module 'crocks/combinators/index.js' {
  declare module.exports: $Exports<'crocks/combinators'>;
}
declare module 'crocks/combinators/psi.js' {
  declare module.exports: $Exports<'crocks/combinators/psi'>;
}
declare module 'crocks/combinators/substitution.js' {
  declare module.exports: $Exports<'crocks/combinators/substitution'>;
}
declare module 'crocks/Const/index' {
  declare module.exports: $Exports<'crocks/Const'>;
}
declare module 'crocks/Const/index.js' {
  declare module.exports: $Exports<'crocks/Const'>;
}
declare module 'crocks/core/_unit.js' {
  declare module.exports: $Exports<'crocks/core/_unit'>;
}
declare module 'crocks/core/apOrFunc.js' {
  declare module.exports: $Exports<'crocks/core/apOrFunc'>;
}
declare module 'crocks/core/array.js' {
  declare module.exports: $Exports<'crocks/core/array'>;
}
declare module 'crocks/core/cloneIterable.js' {
  declare module.exports: $Exports<'crocks/core/cloneIterable'>;
}
declare module 'crocks/core/compose.js' {
  declare module.exports: $Exports<'crocks/core/compose'>;
}
declare module 'crocks/core/curry.js' {
  declare module.exports: $Exports<'crocks/core/curry'>;
}
declare module 'crocks/core/curryN.js' {
  declare module.exports: $Exports<'crocks/core/curryN'>;
}
declare module 'crocks/core/defineUnion.js' {
  declare module.exports: $Exports<'crocks/core/defineUnion'>;
}
declare module 'crocks/core/equals.js' {
  declare module.exports: $Exports<'crocks/core/equals'>;
}
declare module 'crocks/core/flNames.js' {
  declare module.exports: $Exports<'crocks/core/flNames'>;
}
declare module 'crocks/core/hasAlg.js' {
  declare module.exports: $Exports<'crocks/core/hasAlg'>;
}
declare module 'crocks/core/implements.js' {
  declare module.exports: $Exports<'crocks/core/implements'>;
}
declare module 'crocks/core/innerConcat.js' {
  declare module.exports: $Exports<'crocks/core/innerConcat'>;
}
declare module 'crocks/core/inspect.js' {
  declare module.exports: $Exports<'crocks/core/inspect'>;
}
declare module 'crocks/core/isAlt.js' {
  declare module.exports: $Exports<'crocks/core/isAlt'>;
}
declare module 'crocks/core/isApplicative.js' {
  declare module.exports: $Exports<'crocks/core/isApplicative'>;
}
declare module 'crocks/core/isApply.js' {
  declare module.exports: $Exports<'crocks/core/isApply'>;
}
declare module 'crocks/core/isArray.js' {
  declare module.exports: $Exports<'crocks/core/isArray'>;
}
declare module 'crocks/core/isBichain.js' {
  declare module.exports: $Exports<'crocks/core/isBichain'>;
}
declare module 'crocks/core/isBifunctor.js' {
  declare module.exports: $Exports<'crocks/core/isBifunctor'>;
}
declare module 'crocks/core/isChain.js' {
  declare module.exports: $Exports<'crocks/core/isChain'>;
}
declare module 'crocks/core/isContravariant.js' {
  declare module.exports: $Exports<'crocks/core/isContravariant'>;
}
declare module 'crocks/core/isDate.js' {
  declare module.exports: $Exports<'crocks/core/isDate'>;
}
declare module 'crocks/core/isDefined.js' {
  declare module.exports: $Exports<'crocks/core/isDefined'>;
}
declare module 'crocks/core/isEmpty.js' {
  declare module.exports: $Exports<'crocks/core/isEmpty'>;
}
declare module 'crocks/core/isExtend.js' {
  declare module.exports: $Exports<'crocks/core/isExtend'>;
}
declare module 'crocks/core/isFoldable.js' {
  declare module.exports: $Exports<'crocks/core/isFoldable'>;
}
declare module 'crocks/core/isFunction.js' {
  declare module.exports: $Exports<'crocks/core/isFunction'>;
}
declare module 'crocks/core/isFunctor.js' {
  declare module.exports: $Exports<'crocks/core/isFunctor'>;
}
declare module 'crocks/core/isInteger.js' {
  declare module.exports: $Exports<'crocks/core/isInteger'>;
}
declare module 'crocks/core/isIterable.js' {
  declare module.exports: $Exports<'crocks/core/isIterable'>;
}
declare module 'crocks/core/isMap.js' {
  declare module.exports: $Exports<'crocks/core/isMap'>;
}
declare module 'crocks/core/isMonad.js' {
  declare module.exports: $Exports<'crocks/core/isMonad'>;
}
declare module 'crocks/core/isMonoid.js' {
  declare module.exports: $Exports<'crocks/core/isMonoid'>;
}
declare module 'crocks/core/isNil.js' {
  declare module.exports: $Exports<'crocks/core/isNil'>;
}
declare module 'crocks/core/isNumber.js' {
  declare module.exports: $Exports<'crocks/core/isNumber'>;
}
declare module 'crocks/core/isObject.js' {
  declare module.exports: $Exports<'crocks/core/isObject'>;
}
declare module 'crocks/core/isPlus.js' {
  declare module.exports: $Exports<'crocks/core/isPlus'>;
}
declare module 'crocks/core/isPredOrFunc.js' {
  declare module.exports: $Exports<'crocks/core/isPredOrFunc'>;
}
declare module 'crocks/core/isProfunctor.js' {
  declare module.exports: $Exports<'crocks/core/isProfunctor'>;
}
declare module 'crocks/core/isPromise.js' {
  declare module.exports: $Exports<'crocks/core/isPromise'>;
}
declare module 'crocks/core/isSame.js' {
  declare module.exports: $Exports<'crocks/core/isSame'>;
}
declare module 'crocks/core/isSameType.js' {
  declare module.exports: $Exports<'crocks/core/isSameType'>;
}
declare module 'crocks/core/isSemigroup.js' {
  declare module.exports: $Exports<'crocks/core/isSemigroup'>;
}
declare module 'crocks/core/isSemigroupoid.js' {
  declare module.exports: $Exports<'crocks/core/isSemigroupoid'>;
}
declare module 'crocks/core/isString.js' {
  declare module.exports: $Exports<'crocks/core/isString'>;
}
declare module 'crocks/core/isSymbol.js' {
  declare module.exports: $Exports<'crocks/core/isSymbol'>;
}
declare module 'crocks/core/isTypeRepOf.js' {
  declare module.exports: $Exports<'crocks/core/isTypeRepOf'>;
}
declare module 'crocks/core/List.js' {
  declare module.exports: $Exports<'crocks/core/List'>;
}
declare module 'crocks/core/Maybe.js' {
  declare module.exports: $Exports<'crocks/core/Maybe'>;
}
declare module 'crocks/core/mconcatMap.js' {
  declare module.exports: $Exports<'crocks/core/mconcatMap'>;
}
declare module 'crocks/core/object.js' {
  declare module.exports: $Exports<'crocks/core/object'>;
}
declare module 'crocks/core/once.js' {
  declare module.exports: $Exports<'crocks/core/once'>;
}
declare module 'crocks/core/Pair.js' {
  declare module.exports: $Exports<'crocks/core/Pair'>;
}
declare module 'crocks/core/Pred.js' {
  declare module.exports: $Exports<'crocks/core/Pred'>;
}
declare module 'crocks/core/predOrFunc.js' {
  declare module.exports: $Exports<'crocks/core/predOrFunc'>;
}
declare module 'crocks/core/type.js' {
  declare module.exports: $Exports<'crocks/core/type'>;
}
declare module 'crocks/core/types.js' {
  declare module.exports: $Exports<'crocks/core/types'>;
}
declare module 'crocks/core/Unit.js' {
  declare module.exports: $Exports<'crocks/core/Unit'>;
}
declare module 'crocks/dist/crocks.js' {
  declare module.exports: $Exports<'crocks/dist/crocks'>;
}
declare module 'crocks/dist/crocks.min.js' {
  declare module.exports: $Exports<'crocks/dist/crocks.min'>;
}
declare module 'crocks/Either/firstToEither.js' {
  declare module.exports: $Exports<'crocks/Either/firstToEither'>;
}
declare module 'crocks/Either/index' {
  declare module.exports: $Exports<'crocks/Either'>;
}
declare module 'crocks/Either/index.js' {
  declare module.exports: $Exports<'crocks/Either'>;
}
declare module 'crocks/Either/lastToEither.js' {
  declare module.exports: $Exports<'crocks/Either/lastToEither'>;
}
declare module 'crocks/Either/maybeToEither.js' {
  declare module.exports: $Exports<'crocks/Either/maybeToEither'>;
}
declare module 'crocks/Either/resultToEither.js' {
  declare module.exports: $Exports<'crocks/Either/resultToEither'>;
}
declare module 'crocks/Endo/index' {
  declare module.exports: $Exports<'crocks/Endo'>;
}
declare module 'crocks/Endo/index.js' {
  declare module.exports: $Exports<'crocks/Endo'>;
}
declare module 'crocks/Equiv/index' {
  declare module.exports: $Exports<'crocks/Equiv'>;
}
declare module 'crocks/Equiv/index.js' {
  declare module.exports: $Exports<'crocks/Equiv'>;
}
declare module 'crocks/First/eitherToFirst.js' {
  declare module.exports: $Exports<'crocks/First/eitherToFirst'>;
}
declare module 'crocks/First/index' {
  declare module.exports: $Exports<'crocks/First'>;
}
declare module 'crocks/First/index.js' {
  declare module.exports: $Exports<'crocks/First'>;
}
declare module 'crocks/First/lastToFirst.js' {
  declare module.exports: $Exports<'crocks/First/lastToFirst'>;
}
declare module 'crocks/First/maybeToFirst.js' {
  declare module.exports: $Exports<'crocks/First/maybeToFirst'>;
}
declare module 'crocks/First/resultToFirst.js' {
  declare module.exports: $Exports<'crocks/First/resultToFirst'>;
}
declare module 'crocks/helpers/assign.js' {
  declare module.exports: $Exports<'crocks/helpers/assign'>;
}
declare module 'crocks/helpers/assoc.js' {
  declare module.exports: $Exports<'crocks/helpers/assoc'>;
}
declare module 'crocks/helpers/binary.js' {
  declare module.exports: $Exports<'crocks/helpers/binary'>;
}
declare module 'crocks/helpers/compose.js' {
  declare module.exports: $Exports<'crocks/helpers/compose'>;
}
declare module 'crocks/helpers/composeK.js' {
  declare module.exports: $Exports<'crocks/helpers/composeK'>;
}
declare module 'crocks/helpers/composeP.js' {
  declare module.exports: $Exports<'crocks/helpers/composeP'>;
}
declare module 'crocks/helpers/composeS.js' {
  declare module.exports: $Exports<'crocks/helpers/composeS'>;
}
declare module 'crocks/helpers/curry.js' {
  declare module.exports: $Exports<'crocks/helpers/curry'>;
}
declare module 'crocks/helpers/defaultProps.js' {
  declare module.exports: $Exports<'crocks/helpers/defaultProps'>;
}
declare module 'crocks/helpers/defaultTo.js' {
  declare module.exports: $Exports<'crocks/helpers/defaultTo'>;
}
declare module 'crocks/helpers/dissoc.js' {
  declare module.exports: $Exports<'crocks/helpers/dissoc'>;
}
declare module 'crocks/helpers/fromPairs.js' {
  declare module.exports: $Exports<'crocks/helpers/fromPairs'>;
}
declare module 'crocks/helpers/getPathOr.js' {
  declare module.exports: $Exports<'crocks/helpers/getPathOr'>;
}
declare module 'crocks/helpers/getPropOr.js' {
  declare module.exports: $Exports<'crocks/helpers/getPropOr'>;
}
declare module 'crocks/helpers/index' {
  declare module.exports: $Exports<'crocks/helpers'>;
}
declare module 'crocks/helpers/index.js' {
  declare module.exports: $Exports<'crocks/helpers'>;
}
declare module 'crocks/helpers/liftA2.js' {
  declare module.exports: $Exports<'crocks/helpers/liftA2'>;
}
declare module 'crocks/helpers/liftA3.js' {
  declare module.exports: $Exports<'crocks/helpers/liftA3'>;
}
declare module 'crocks/helpers/liftN.js' {
  declare module.exports: $Exports<'crocks/helpers/liftN'>;
}
declare module 'crocks/helpers/mapProps.js' {
  declare module.exports: $Exports<'crocks/helpers/mapProps'>;
}
declare module 'crocks/helpers/mapReduce.js' {
  declare module.exports: $Exports<'crocks/helpers/mapReduce'>;
}
declare module 'crocks/helpers/mconcat.js' {
  declare module.exports: $Exports<'crocks/helpers/mconcat'>;
}
declare module 'crocks/helpers/mconcatMap.js' {
  declare module.exports: $Exports<'crocks/helpers/mconcatMap'>;
}
declare module 'crocks/helpers/mreduce.js' {
  declare module.exports: $Exports<'crocks/helpers/mreduce'>;
}
declare module 'crocks/helpers/mreduceMap.js' {
  declare module.exports: $Exports<'crocks/helpers/mreduceMap'>;
}
declare module 'crocks/helpers/nAry.js' {
  declare module.exports: $Exports<'crocks/helpers/nAry'>;
}
declare module 'crocks/helpers/objOf.js' {
  declare module.exports: $Exports<'crocks/helpers/objOf'>;
}
declare module 'crocks/helpers/omit.js' {
  declare module.exports: $Exports<'crocks/helpers/omit'>;
}
declare module 'crocks/helpers/once.js' {
  declare module.exports: $Exports<'crocks/helpers/once'>;
}
declare module 'crocks/helpers/partial.js' {
  declare module.exports: $Exports<'crocks/helpers/partial'>;
}
declare module 'crocks/helpers/pick.js' {
  declare module.exports: $Exports<'crocks/helpers/pick'>;
}
declare module 'crocks/helpers/pipe.js' {
  declare module.exports: $Exports<'crocks/helpers/pipe'>;
}
declare module 'crocks/helpers/pipeK.js' {
  declare module.exports: $Exports<'crocks/helpers/pipeK'>;
}
declare module 'crocks/helpers/pipeP.js' {
  declare module.exports: $Exports<'crocks/helpers/pipeP'>;
}
declare module 'crocks/helpers/pipeS.js' {
  declare module.exports: $Exports<'crocks/helpers/pipeS'>;
}
declare module 'crocks/helpers/propOr.js' {
  declare module.exports: $Exports<'crocks/helpers/propOr'>;
}
declare module 'crocks/helpers/propPathOr.js' {
  declare module.exports: $Exports<'crocks/helpers/propPathOr'>;
}
declare module 'crocks/helpers/setPath.js' {
  declare module.exports: $Exports<'crocks/helpers/setPath'>;
}
declare module 'crocks/helpers/setProp.js' {
  declare module.exports: $Exports<'crocks/helpers/setProp'>;
}
declare module 'crocks/helpers/tap.js' {
  declare module.exports: $Exports<'crocks/helpers/tap'>;
}
declare module 'crocks/helpers/unary.js' {
  declare module.exports: $Exports<'crocks/helpers/unary'>;
}
declare module 'crocks/helpers/unit.js' {
  declare module.exports: $Exports<'crocks/helpers/unit'>;
}
declare module 'crocks/helpers/unsetPath.js' {
  declare module.exports: $Exports<'crocks/helpers/unsetPath'>;
}
declare module 'crocks/helpers/unsetProp.js' {
  declare module.exports: $Exports<'crocks/helpers/unsetProp'>;
}
declare module 'crocks/Identity/index' {
  declare module.exports: $Exports<'crocks/Identity'>;
}
declare module 'crocks/Identity/index.js' {
  declare module.exports: $Exports<'crocks/Identity'>;
}
declare module 'crocks/index' {
  declare module.exports: $Exports<'crocks'>;
}
declare module 'crocks/index.js' {
  declare module.exports: $Exports<'crocks'>;
}
declare module 'crocks/IO/index' {
  declare module.exports: $Exports<'crocks/IO'>;
}
declare module 'crocks/IO/index.js' {
  declare module.exports: $Exports<'crocks/IO'>;
}
declare module 'crocks/Last/eitherToLast.js' {
  declare module.exports: $Exports<'crocks/Last/eitherToLast'>;
}
declare module 'crocks/Last/firstToLast.js' {
  declare module.exports: $Exports<'crocks/Last/firstToLast'>;
}
declare module 'crocks/Last/index' {
  declare module.exports: $Exports<'crocks/Last'>;
}
declare module 'crocks/Last/index.js' {
  declare module.exports: $Exports<'crocks/Last'>;
}
declare module 'crocks/Last/maybeToLast.js' {
  declare module.exports: $Exports<'crocks/Last/maybeToLast'>;
}
declare module 'crocks/Last/resultToLast.js' {
  declare module.exports: $Exports<'crocks/Last/resultToLast'>;
}
declare module 'crocks/List/arrayToList.js' {
  declare module.exports: $Exports<'crocks/List/arrayToList'>;
}
declare module 'crocks/List/index' {
  declare module.exports: $Exports<'crocks/List'>;
}
declare module 'crocks/List/index.js' {
  declare module.exports: $Exports<'crocks/List'>;
}
declare module 'crocks/List/listToArray.js' {
  declare module.exports: $Exports<'crocks/List/listToArray'>;
}
declare module 'crocks/List/maybeToList.js' {
  declare module.exports: $Exports<'crocks/List/maybeToList'>;
}
declare module 'crocks/logic/and.js' {
  declare module.exports: $Exports<'crocks/logic/and'>;
}
declare module 'crocks/logic/ifElse.js' {
  declare module.exports: $Exports<'crocks/logic/ifElse'>;
}
declare module 'crocks/logic/implies.js' {
  declare module.exports: $Exports<'crocks/logic/implies'>;
}
declare module 'crocks/logic/index' {
  declare module.exports: $Exports<'crocks/logic'>;
}
declare module 'crocks/logic/index.js' {
  declare module.exports: $Exports<'crocks/logic'>;
}
declare module 'crocks/logic/not.js' {
  declare module.exports: $Exports<'crocks/logic/not'>;
}
declare module 'crocks/logic/or.js' {
  declare module.exports: $Exports<'crocks/logic/or'>;
}
declare module 'crocks/logic/unless.js' {
  declare module.exports: $Exports<'crocks/logic/unless'>;
}
declare module 'crocks/logic/when.js' {
  declare module.exports: $Exports<'crocks/logic/when'>;
}
declare module 'crocks/Max/index' {
  declare module.exports: $Exports<'crocks/Max'>;
}
declare module 'crocks/Max/index.js' {
  declare module.exports: $Exports<'crocks/Max'>;
}
declare module 'crocks/Maybe/eitherToMaybe.js' {
  declare module.exports: $Exports<'crocks/Maybe/eitherToMaybe'>;
}
declare module 'crocks/Maybe/find.js' {
  declare module.exports: $Exports<'crocks/Maybe/find'>;
}
declare module 'crocks/Maybe/firstToMaybe.js' {
  declare module.exports: $Exports<'crocks/Maybe/firstToMaybe'>;
}
declare module 'crocks/Maybe/getPath.js' {
  declare module.exports: $Exports<'crocks/Maybe/getPath'>;
}
declare module 'crocks/Maybe/getProp.js' {
  declare module.exports: $Exports<'crocks/Maybe/getProp'>;
}
declare module 'crocks/Maybe/index' {
  declare module.exports: $Exports<'crocks/Maybe'>;
}
declare module 'crocks/Maybe/index.js' {
  declare module.exports: $Exports<'crocks/Maybe'>;
}
declare module 'crocks/Maybe/lastToMaybe.js' {
  declare module.exports: $Exports<'crocks/Maybe/lastToMaybe'>;
}
declare module 'crocks/Maybe/maybeToArray.js' {
  declare module.exports: $Exports<'crocks/Maybe/maybeToArray'>;
}
declare module 'crocks/Maybe/prop.js' {
  declare module.exports: $Exports<'crocks/Maybe/prop'>;
}
declare module 'crocks/Maybe/propPath.js' {
  declare module.exports: $Exports<'crocks/Maybe/propPath'>;
}
declare module 'crocks/Maybe/resultToMaybe.js' {
  declare module.exports: $Exports<'crocks/Maybe/resultToMaybe'>;
}
declare module 'crocks/Maybe/safe.js' {
  declare module.exports: $Exports<'crocks/Maybe/safe'>;
}
declare module 'crocks/Maybe/safeAfter.js' {
  declare module.exports: $Exports<'crocks/Maybe/safeAfter'>;
}
declare module 'crocks/Maybe/safeLift.js' {
  declare module.exports: $Exports<'crocks/Maybe/safeLift'>;
}
declare module 'crocks/Min/index' {
  declare module.exports: $Exports<'crocks/Min'>;
}
declare module 'crocks/Min/index.js' {
  declare module.exports: $Exports<'crocks/Min'>;
}
declare module 'crocks/Pair/branch.js' {
  declare module.exports: $Exports<'crocks/Pair/branch'>;
}
declare module 'crocks/Pair/fanout.js' {
  declare module.exports: $Exports<'crocks/Pair/fanout'>;
}
declare module 'crocks/Pair/fst.js' {
  declare module.exports: $Exports<'crocks/Pair/fst'>;
}
declare module 'crocks/Pair/index' {
  declare module.exports: $Exports<'crocks/Pair'>;
}
declare module 'crocks/Pair/index.js' {
  declare module.exports: $Exports<'crocks/Pair'>;
}
declare module 'crocks/Pair/snd.js' {
  declare module.exports: $Exports<'crocks/Pair/snd'>;
}
declare module 'crocks/Pair/toPairs.js' {
  declare module.exports: $Exports<'crocks/Pair/toPairs'>;
}
declare module 'crocks/Pair/writerToPair.js' {
  declare module.exports: $Exports<'crocks/Pair/writerToPair'>;
}
declare module 'crocks/pointfree/alt.js' {
  declare module.exports: $Exports<'crocks/pointfree/alt'>;
}
declare module 'crocks/pointfree/ap.js' {
  declare module.exports: $Exports<'crocks/pointfree/ap'>;
}
declare module 'crocks/pointfree/bichain.js' {
  declare module.exports: $Exports<'crocks/pointfree/bichain'>;
}
declare module 'crocks/pointfree/bimap.js' {
  declare module.exports: $Exports<'crocks/pointfree/bimap'>;
}
declare module 'crocks/pointfree/both.js' {
  declare module.exports: $Exports<'crocks/pointfree/both'>;
}
declare module 'crocks/pointfree/chain.js' {
  declare module.exports: $Exports<'crocks/pointfree/chain'>;
}
declare module 'crocks/pointfree/coalesce.js' {
  declare module.exports: $Exports<'crocks/pointfree/coalesce'>;
}
declare module 'crocks/pointfree/compareWith.js' {
  declare module.exports: $Exports<'crocks/pointfree/compareWith'>;
}
declare module 'crocks/pointfree/concat.js' {
  declare module.exports: $Exports<'crocks/pointfree/concat'>;
}
declare module 'crocks/pointfree/cons.js' {
  declare module.exports: $Exports<'crocks/pointfree/cons'>;
}
declare module 'crocks/pointfree/contramap.js' {
  declare module.exports: $Exports<'crocks/pointfree/contramap'>;
}
declare module 'crocks/pointfree/either.js' {
  declare module.exports: $Exports<'crocks/pointfree/either'>;
}
declare module 'crocks/pointfree/empty.js' {
  declare module.exports: $Exports<'crocks/pointfree/empty'>;
}
declare module 'crocks/pointfree/equals.js' {
  declare module.exports: $Exports<'crocks/pointfree/equals'>;
}
declare module 'crocks/pointfree/extend.js' {
  declare module.exports: $Exports<'crocks/pointfree/extend'>;
}
declare module 'crocks/pointfree/filter.js' {
  declare module.exports: $Exports<'crocks/pointfree/filter'>;
}
declare module 'crocks/pointfree/first.js' {
  declare module.exports: $Exports<'crocks/pointfree/first'>;
}
declare module 'crocks/pointfree/fold.js' {
  declare module.exports: $Exports<'crocks/pointfree/fold'>;
}
declare module 'crocks/pointfree/foldMap.js' {
  declare module.exports: $Exports<'crocks/pointfree/foldMap'>;
}
declare module 'crocks/pointfree/head.js' {
  declare module.exports: $Exports<'crocks/pointfree/head'>;
}
declare module 'crocks/pointfree/index' {
  declare module.exports: $Exports<'crocks/pointfree'>;
}
declare module 'crocks/pointfree/index.js' {
  declare module.exports: $Exports<'crocks/pointfree'>;
}
declare module 'crocks/pointfree/init.js' {
  declare module.exports: $Exports<'crocks/pointfree/init'>;
}
declare module 'crocks/pointfree/last.js' {
  declare module.exports: $Exports<'crocks/pointfree/last'>;
}
declare module 'crocks/pointfree/map.js' {
  declare module.exports: $Exports<'crocks/pointfree/map'>;
}
declare module 'crocks/pointfree/merge.js' {
  declare module.exports: $Exports<'crocks/pointfree/merge'>;
}
declare module 'crocks/pointfree/option.js' {
  declare module.exports: $Exports<'crocks/pointfree/option'>;
}
declare module 'crocks/pointfree/promap.js' {
  declare module.exports: $Exports<'crocks/pointfree/promap'>;
}
declare module 'crocks/pointfree/reduce.js' {
  declare module.exports: $Exports<'crocks/pointfree/reduce'>;
}
declare module 'crocks/pointfree/reduceRight.js' {
  declare module.exports: $Exports<'crocks/pointfree/reduceRight'>;
}
declare module 'crocks/pointfree/reject.js' {
  declare module.exports: $Exports<'crocks/pointfree/reject'>;
}
declare module 'crocks/pointfree/run.js' {
  declare module.exports: $Exports<'crocks/pointfree/run'>;
}
declare module 'crocks/pointfree/runWith.js' {
  declare module.exports: $Exports<'crocks/pointfree/runWith'>;
}
declare module 'crocks/pointfree/second.js' {
  declare module.exports: $Exports<'crocks/pointfree/second'>;
}
declare module 'crocks/pointfree/sequence.js' {
  declare module.exports: $Exports<'crocks/pointfree/sequence'>;
}
declare module 'crocks/pointfree/swap.js' {
  declare module.exports: $Exports<'crocks/pointfree/swap'>;
}
declare module 'crocks/pointfree/tail.js' {
  declare module.exports: $Exports<'crocks/pointfree/tail'>;
}
declare module 'crocks/pointfree/traverse.js' {
  declare module.exports: $Exports<'crocks/pointfree/traverse'>;
}
declare module 'crocks/pointfree/valueOf.js' {
  declare module.exports: $Exports<'crocks/pointfree/valueOf'>;
}
declare module 'crocks/Pred/index' {
  declare module.exports: $Exports<'crocks/Pred'>;
}
declare module 'crocks/Pred/index.js' {
  declare module.exports: $Exports<'crocks/Pred'>;
}
declare module 'crocks/predicates/hasProp.js' {
  declare module.exports: $Exports<'crocks/predicates/hasProp'>;
}
declare module 'crocks/predicates/hasPropPath.js' {
  declare module.exports: $Exports<'crocks/predicates/hasPropPath'>;
}
declare module 'crocks/predicates/hasProps.js' {
  declare module.exports: $Exports<'crocks/predicates/hasProps'>;
}
declare module 'crocks/predicates/index' {
  declare module.exports: $Exports<'crocks/predicates'>;
}
declare module 'crocks/predicates/index.js' {
  declare module.exports: $Exports<'crocks/predicates'>;
}
declare module 'crocks/predicates/isAlt.js' {
  declare module.exports: $Exports<'crocks/predicates/isAlt'>;
}
declare module 'crocks/predicates/isAlternative.js' {
  declare module.exports: $Exports<'crocks/predicates/isAlternative'>;
}
declare module 'crocks/predicates/isApplicative.js' {
  declare module.exports: $Exports<'crocks/predicates/isApplicative'>;
}
declare module 'crocks/predicates/isApply.js' {
  declare module.exports: $Exports<'crocks/predicates/isApply'>;
}
declare module 'crocks/predicates/isArray.js' {
  declare module.exports: $Exports<'crocks/predicates/isArray'>;
}
declare module 'crocks/predicates/isBichain.js' {
  declare module.exports: $Exports<'crocks/predicates/isBichain'>;
}
declare module 'crocks/predicates/isBifunctor.js' {
  declare module.exports: $Exports<'crocks/predicates/isBifunctor'>;
}
declare module 'crocks/predicates/isBoolean.js' {
  declare module.exports: $Exports<'crocks/predicates/isBoolean'>;
}
declare module 'crocks/predicates/isCategory.js' {
  declare module.exports: $Exports<'crocks/predicates/isCategory'>;
}
declare module 'crocks/predicates/isChain.js' {
  declare module.exports: $Exports<'crocks/predicates/isChain'>;
}
declare module 'crocks/predicates/isContravariant.js' {
  declare module.exports: $Exports<'crocks/predicates/isContravariant'>;
}
declare module 'crocks/predicates/isDate.js' {
  declare module.exports: $Exports<'crocks/predicates/isDate'>;
}
declare module 'crocks/predicates/isDefined.js' {
  declare module.exports: $Exports<'crocks/predicates/isDefined'>;
}
declare module 'crocks/predicates/isEmpty.js' {
  declare module.exports: $Exports<'crocks/predicates/isEmpty'>;
}
declare module 'crocks/predicates/isExtend.js' {
  declare module.exports: $Exports<'crocks/predicates/isExtend'>;
}
declare module 'crocks/predicates/isFalse.js' {
  declare module.exports: $Exports<'crocks/predicates/isFalse'>;
}
declare module 'crocks/predicates/isFalsy.js' {
  declare module.exports: $Exports<'crocks/predicates/isFalsy'>;
}
declare module 'crocks/predicates/isFoldable.js' {
  declare module.exports: $Exports<'crocks/predicates/isFoldable'>;
}
declare module 'crocks/predicates/isFunction.js' {
  declare module.exports: $Exports<'crocks/predicates/isFunction'>;
}
declare module 'crocks/predicates/isFunctor.js' {
  declare module.exports: $Exports<'crocks/predicates/isFunctor'>;
}
declare module 'crocks/predicates/isInteger.js' {
  declare module.exports: $Exports<'crocks/predicates/isInteger'>;
}
declare module 'crocks/predicates/isIterable.js' {
  declare module.exports: $Exports<'crocks/predicates/isIterable'>;
}
declare module 'crocks/predicates/isMap.js' {
  declare module.exports: $Exports<'crocks/predicates/isMap'>;
}
declare module 'crocks/predicates/isMonad.js' {
  declare module.exports: $Exports<'crocks/predicates/isMonad'>;
}
declare module 'crocks/predicates/isMonoid.js' {
  declare module.exports: $Exports<'crocks/predicates/isMonoid'>;
}
declare module 'crocks/predicates/isNil.js' {
  declare module.exports: $Exports<'crocks/predicates/isNil'>;
}
declare module 'crocks/predicates/isNumber.js' {
  declare module.exports: $Exports<'crocks/core/isNumber'>;
}
declare module 'crocks/predicates/isObject.js' {
  declare module.exports: $Exports<'crocks/predicates/isObject'>;
}
declare module 'crocks/predicates/isPlus.js' {
  declare module.exports: $Exports<'crocks/predicates/isPlus'>;
}
declare module 'crocks/predicates/isProfunctor.js' {
  declare module.exports: $Exports<'crocks/predicates/isProfunctor'>;
}
declare module 'crocks/predicates/isPromise.js' {
  declare module.exports: $Exports<'crocks/predicates/isPromise'>;
}
declare module 'crocks/predicates/isSame.js' {
  declare module.exports: $Exports<'crocks/predicates/isSame'>;
}
declare module 'crocks/predicates/isSameType.js' {
  declare module.exports: $Exports<'crocks/predicates/isSameType'>;
}
declare module 'crocks/predicates/isSemigroup.js' {
  declare module.exports: $Exports<'crocks/predicates/isSemigroup'>;
}
declare module 'crocks/predicates/isSemigroupoid.js' {
  declare module.exports: $Exports<'crocks/predicates/isSemigroupoid'>;
}
declare module 'crocks/predicates/isSetoid.js' {
  declare module.exports: $Exports<'crocks/predicates/isSetoid'>;
}
declare module 'crocks/predicates/isString.js' {
  declare module.exports: $Exports<'crocks/predicates/isString'>;
}
declare module 'crocks/predicates/isSymbol.js' {
  declare module.exports: $Exports<'crocks/predicates/isSymbol'>;
}
declare module 'crocks/predicates/isTraversable.js' {
  declare module.exports: $Exports<'crocks/predicates/isTraversable'>;
}
declare module 'crocks/predicates/isTrue.js' {
  declare module.exports: $Exports<'crocks/predicates/isTrue'>;
}
declare module 'crocks/predicates/isTruthy.js' {
  declare module.exports: $Exports<'crocks/predicates/isTruthy'>;
}
declare module 'crocks/predicates/pathEq.js' {
  declare module.exports: $Exports<'crocks/predicates/pathEq'>;
}
declare module 'crocks/predicates/pathSatisfies.js' {
  declare module.exports: $Exports<'crocks/predicates/pathSatisfies'>;
}
declare module 'crocks/predicates/propEq.js' {
  declare module.exports: $Exports<'crocks/predicates/propEq'>;
}
declare module 'crocks/predicates/propPathEq.js' {
  declare module.exports: $Exports<'crocks/predicates/propPathEq'>;
}
declare module 'crocks/predicates/propPathSatisfies.js' {
  declare module.exports: $Exports<'crocks/predicates/propPathSatisfies'>;
}
declare module 'crocks/predicates/propSatisfies.js' {
  declare module.exports: $Exports<'crocks/predicates/propSatisfies'>;
}
declare module 'crocks/Prod/index' {
  declare module.exports: $Exports<'crocks/Prod'>;
}
declare module 'crocks/Prod/index.js' {
  declare module.exports: $Exports<'crocks/Prod'>;
}
declare module 'crocks/Reader/index' {
  declare module.exports: $Exports<'crocks/Reader'>;
}
declare module 'crocks/Reader/index.js' {
  declare module.exports: $Exports<'crocks/Reader'>;
}
declare module 'crocks/Reader/ReaderT.js' {
  declare module.exports: $Exports<'crocks/Reader/ReaderT'>;
}
declare module 'crocks/Result/eitherToResult.js' {
  declare module.exports: $Exports<'crocks/Result/eitherToResult'>;
}
declare module 'crocks/Result/firstToResult.js' {
  declare module.exports: $Exports<'crocks/Result/firstToResult'>;
}
declare module 'crocks/Result/index' {
  declare module.exports: $Exports<'crocks/Result'>;
}
declare module 'crocks/Result/index.js' {
  declare module.exports: $Exports<'crocks/Result'>;
}
declare module 'crocks/Result/lastToResult.js' {
  declare module.exports: $Exports<'crocks/Result/lastToResult'>;
}
declare module 'crocks/Result/maybeToResult.js' {
  declare module.exports: $Exports<'crocks/Result/maybeToResult'>;
}
declare module 'crocks/Result/tryCatch.js' {
  declare module.exports: $Exports<'crocks/Result/tryCatch'>;
}
declare module 'crocks/Star/index' {
  declare module.exports: $Exports<'crocks/Star'>;
}
declare module 'crocks/Star/index.js' {
  declare module.exports: $Exports<'crocks/Star'>;
}
declare module 'crocks/State/evalWith.js' {
  declare module.exports: $Exports<'crocks/State/evalWith'>;
}
declare module 'crocks/State/execWith.js' {
  declare module.exports: $Exports<'crocks/State/execWith'>;
}
declare module 'crocks/State/index' {
  declare module.exports: $Exports<'crocks/State'>;
}
declare module 'crocks/State/index.js' {
  declare module.exports: $Exports<'crocks/State'>;
}
declare module 'crocks/Sum/index' {
  declare module.exports: $Exports<'crocks/Sum'>;
}
declare module 'crocks/Sum/index.js' {
  declare module.exports: $Exports<'crocks/Sum'>;
}
declare module 'crocks/Tuple/index' {
  declare module.exports: $Exports<'crocks/Tuple'>;
}
declare module 'crocks/Tuple/index.js' {
  declare module.exports: $Exports<'crocks/Tuple'>;
}
declare module 'crocks/Tuple/nmap.js' {
  declare module.exports: $Exports<'crocks/Tuple/nmap'>;
}
declare module 'crocks/Tuple/project.js' {
  declare module.exports: $Exports<'crocks/Tuple/project'>;
}
declare module 'crocks/Tuple/tupleToArray.js' {
  declare module.exports: $Exports<'crocks/Tuple/tupleToArray'>;
}
declare module 'crocks/Unit/index' {
  declare module.exports: $Exports<'crocks/Unit'>;
}
declare module 'crocks/Unit/index.js' {
  declare module.exports: $Exports<'crocks/Unit'>;
}
declare module 'crocks/Writer/index' {
  declare module.exports: $Exports<'crocks/Writer'>;
}
declare module 'crocks/Writer/index.js' {
  declare module.exports: $Exports<'crocks/Writer'>;
}
declare module 'crocks/Writer/log.js' {
  declare module.exports: $Exports<'crocks/Writer/log'>;
}
declare module 'crocks/Writer/read.js' {
  declare module.exports: $Exports<'crocks/Writer/read'>;
}
