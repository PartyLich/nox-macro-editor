// flow-typed signature: 553bab34bd5b22506fed0047739d246a
// flow-typed version: <<STUB>>/react-id-generator_v3.0.1/flow_v0.145.0

declare module 'react-id-generator' {
  declare export default function nextId(localPrefix?: string | null): string;

  declare export function useId(count?: number, prefix?: string): Array<string>;

  declare export function resetId(): void;

  declare export function setPrefix(newPrefix: string): void;
}
