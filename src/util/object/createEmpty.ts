export function objectCreateEmpty(): { [key: string]: any } {
  return new Object(null) as { [key: string]: any };
}
