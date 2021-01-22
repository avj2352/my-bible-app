export interface ISearch {
    table: 'groups' | 'tags' | 'items' | 'recipes';
    type?: 'full' | 'partial',
    query? : string;
}