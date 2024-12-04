<?php

namespace App\Factory;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;
use Zenstruck\Foundry\Persistence\Proxy;
use Zenstruck\Foundry\Persistence\ProxyRepositoryDecorator;

/**
 * @extends PersistentProxyObjectFactory<Produit>
 *
 * @method        Produit|Proxy create(array|callable $attributes = [])
 * @method static Produit|Proxy createOne(array $attributes = [])
 * @method static Produit|Proxy find(object|array|mixed $criteria)
 * @method static Produit|Proxy findOrCreate(array $attributes)
 * @method static Produit|Proxy first(string $sortedField = 'id')
 * @method static Produit|Proxy last(string $sortedField = 'id')
 * @method static Produit|Proxy random(array $attributes = [])
 * @method static Produit|Proxy randomOrCreate(array $attributes = [])
 * @method static ProduitRepository|ProxyRepositoryDecorator repository()
 * @method static Produit[]|Proxy[] all()
 * @method static Produit[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Produit[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Produit[]|Proxy[] findBy(array $attributes)
 * @method static Produit[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Produit[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ProduitFactory extends PersistentProxyObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct() {}

    public static function class(): string
    {
        return Produit::class;
    }

    private const PRODUCT_NAMES =
    [
        'Smartphone Samsung Galaxy S23',
        'Laptop Dell XPS 13',
        'Casque Bluetooth Sony WH-1000XM5',
        'Montre connectée Apple Watch Ultra',
        'Chaussures Nike Air Max',
        'T-shirt Vans Classic',
        'Sac à dos North Face Recon',
        'Casque de vélo Giro Aether MIPS',
        'Ordinateur de bureau HP Pavilion',
        'Tablette Apple iPad Air',
        'Appareil photo Canon EOS R5',
        'Casque gaming SteelSeries Arctis 7',
        'Chaise ergonomique Secretlab Titan',
        'Clavier mécanique Logitech G Pro X',
        'Câble HDMI 4K Anker',
        'Lampe LED de bureau Philips Hue',
        'Batterie externe Anker PowerCore',
        'Enceinte Bluetooth JBL Flip 5',
        'Coffre-fort électronique Yale',
        'Robot aspirateur iRobot Roomba 981',
        'Machine à café Nespresso Vertuo',
        'Réfrigérateur Samsung Family Hub',
        'Cuisinière à induction Bosch',
        'Lave-vaisselle Siemens iQ700',
        'Montre Garmin Forerunner 945',
        'Vélo de route Trek Emonda SL7',
        'Tente de camping Quechua 2 seconds',
        'Appareil de massage Theragun PRO',
        'Porte-clés personnalisé Coach',
        'Manteau en laine Zara',
        'Robe de soirée Hugo Boss',
        'Pantalon chino Dockers',
        'Montre Fossil Hybrid HR',
        'Sac à main Michael Kors',
        'Couteau de cuisine Wüsthof Classic',
        'Moulins à poivre Peugeot',
        'Assiette en porcelaine Villeroy & Boch',
        'Meuble TV IKEA Hemnes',
        'Coussin décoratif H&M Home',
        'Lit double Tempur-Pedic',
        'Système de son Bose Soundbar 700',
        'Climatiseur portable De\'Longhi',
        'Piano numérique Yamaha P-125',
        'Table de cuisson induction Siemens',
        'Balance connectée Withings Body+',
        'Couteau suisse Victorinox',
        'Batterie de cuisine Tefal Ingenio',
        'Haut-parleur Marshall Stanmore II',
        'Tapis de yoga Liforme',
        'Vêtements de ski Columbia',
        'Lunettes de soleil Ray-Ban Aviator',
        'Valise Samsonite Cosmolite',
        'Chambre à air Schwalbe',
        'Chapeau Panama Stetson',
        'Canne à pêche Shimano',
        'Table de ping-pong Cornilleau',
        'Chaise longue Lafuma',
        'Parapluie de luxe Longchamp',
        'Oreiller ergonomique Tempur',
        'Cire à bois Liberon',
        'Set de pinceaux maquillage MAC',
        'Crème anti-âge Estée Lauder',
        'Doudoune Moncler',
        'Pull en cachemire Uniqlo',
        'Jupe midi Zara',
        'Paire de gants en cuir Dents',
        'Gilet en laine Loro Piana',
        'Mocassins Tod\'s',
        'Sac à dos Eastpak',
        'Tapis de course NordicTrack Commercial 1750',
        'Enceinte intelligente Google Nest Audio',
        'Machine à pain Panasonic SD-ZP2000',
        'Coffret de cuisine Le Creuset',
        'Tondeuse à cheveux Philips Series 5000',
        'Panier de basket Wilson Evolution',
        'Guitare électrique Fender Stratocaster',
        'Maillot de bain Speedo',
        'Veste en cuir Schott NYC',
        'Parfum Dior Sauvage',
        'Tricycle pour enfant Fisher-Price',
        'Couteau de poche Opinel',
        'Chaussettes merino Smartwool',
        'Montre Citizen Eco-Drive',
        'Tableau blanc interactif Samsung',
        'Lunettes de lecture Oliver Peoples',
        'Patins à glace Bauer Vapor',
        'Ski Alpin Salomon X-Drive',
        'Set de tennis Wilson Pro Staff',
        'Casque de ski Oakley',
        'Gant de golf Titleist Pro V1',
    ];


    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'categorie' => CategorieFactory::new(),
            'date_creation' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'nom' => self::faker()->randomElement(self::PRODUCT_NAMES),
            'description' => self::faker()->paragraph(),
            'prix' => self::faker()->randomNumber(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Produit $produit): void {})
        ;
    }
}
