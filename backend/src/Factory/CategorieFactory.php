<?php

namespace App\Factory;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;
use Zenstruck\Foundry\Persistence\Proxy;
use Zenstruck\Foundry\Persistence\ProxyRepositoryDecorator;

/**
 * @extends PersistentProxyObjectFactory<Categorie>
 *
 * @method        Categorie|Proxy create(array|callable $attributes = [])
 * @method static Categorie|Proxy createOne(array $attributes = [])
 * @method static Categorie|Proxy find(object|array|mixed $criteria)
 * @method static Categorie|Proxy findOrCreate(array $attributes)
 * @method static Categorie|Proxy first(string $sortedField = 'id')
 * @method static Categorie|Proxy last(string $sortedField = 'id')
 * @method static Categorie|Proxy random(array $attributes = [])
 * @method static Categorie|Proxy randomOrCreate(array $attributes = [])
 * @method static CategorieRepository|ProxyRepositoryDecorator repository()
 * @method static Categorie[]|Proxy[] all()
 * @method static Categorie[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Categorie[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Categorie[]|Proxy[] findBy(array $attributes)
 * @method static Categorie[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Categorie[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class CategorieFactory extends PersistentProxyObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct() {}

    public static function class(): string
    {
        return Categorie::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {

        $categories = [
            'Électronique',
            'Vêtements',
            'Meubles',
            'Jardin et extérieur',
            'Alimentation',
            'Sports et loisirs',
            'Santé et beauté',
            'Informatique et télécommunications',
            'Livres et médias',
            'Automobile',
        ];
        return [
            'nom' => self::faker()->randomElement($categories),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Categorie $categorie): void {})
        ;
    }
}
