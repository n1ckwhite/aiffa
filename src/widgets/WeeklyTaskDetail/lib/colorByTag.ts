export function colorByTag(tag?: string): string {
  switch ((tag || '').toUpperCase()) {
    case 'REACT':
    case 'REACTNATIVE':
    case 'RN':
      return 'cyan';
    case 'HTML':
      return 'orange';
    case 'CSS':
      return 'blue';
    case 'JS':
      return 'yellow';
    case 'TS':
    case 'TYPESCRIPT':
      return 'blue';
    case 'NODE':
    case 'NODEJS':
      return 'green';
    case 'GIT':
      return 'red';
    case 'GO':
      return 'teal';
    default:
      return 'blue';
  }
}


