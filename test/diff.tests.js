import { test } from '../node_modules/cutest/cutest.mjs'
import simpleDiff from '../src/Util/simpleDiff.js'
import Chance from 'chance'

function runDiffTest (t, a, b, expected) {
  let result = simpleDiff(a, b)
  t.compare(result, expected, `Compare "${a}" with "${b}"`)
}

test('diff tests', async function diff1 (t) {
  runDiffTest(t, 'abc', 'axc', { pos: 1, remove: 1, insert: 'x' })
  runDiffTest(t, 'bc', 'xc', { pos: 0, remove: 1, insert: 'x' })
  runDiffTest(t, 'ab', 'ax', { pos: 1, remove: 1, insert: 'x' })
  runDiffTest(t, 'b', 'x', { pos: 0, remove: 1, insert: 'x' })
  runDiffTest(t, '', 'abc', { pos: 0, remove: 0, insert: 'abc' })
  runDiffTest(t, 'abc', 'xyz', { pos: 0, remove: 3, insert: 'xyz' })
  runDiffTest(t, 'axz', 'au', { pos: 1, remove: 2, insert: 'u' })
  runDiffTest(t, 'ax', 'axy', { pos: 2, remove: 0, insert: 'y' })
})

test('random diff tests', async function randomDiff (t) {
  const chance = new Chance(t.getSeed() * 1000000000)
  let a = chance.word()
  let b = chance.word()
  let change = simpleDiff(a, b)
  let arr = Array.from(a)
  arr.splice(change.pos, change.remove, ...Array.from(change.insert))
  t.assert(arr.join('') === b, 'Applying change information is correct')
})
