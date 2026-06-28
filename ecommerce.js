const { useState } = React;

const products = [
  {
    id: 1,
    name: "Casque Gaming Pro",
    category: "Audio",
    price: 89,
    rating: 5,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80",
    description: "Casque confortable avec son clair pour les longues sessions gaming."
  },
  {
    id: 2,
    name: "Clavier Mécanique RGB",
    category: "Clavier",
    price: 120,
    rating: 5,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Clavier mécanique rapide avec éclairage RGB."
  },
  {
    id: 3,
    name: "Souris Gaming Wireless",
    category: "Souris",
    price: 65,
    rating: 4,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    description: "Souris légère et précise pour les joueurs compétitifs."
  },
  {
    id: 4,
    name: "Support Laptop Aluminium",
    category: "Accessoire",
    price: 45,
    rating: 4,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "Support solide pour améliorer la posture au bureau."
  },
  {
    id: 5,
    name: "Écouteurs Bluetooth",
    category: "Audio",
    price: 55,
    rating: 4,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
    description: "Écouteurs sans fil pratiques pour le travail et le sport."
  },
  {
    id: 6,
    name: "Webcam HD",
    category: "Accessoire",
    price: 75,
    rating: 3,
    image: "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&w=800&q=80",
    description: "Webcam HD pour réunions, cours en ligne et streaming."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState("Tous");
  const [minRating, setMinRating] = useState("Tous");
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [orderDone, setOrderDone] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "Tous" || product.category === category;
    const matchPrice = maxPrice === "Tous" || product.price <= Number(maxPrice);
    const matchRating = minRating === "Tous" || product.rating >= Number(minRating);

    return matchSearch && matchCategory && matchPrice && matchRating;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  function nextStep() {
    if (cart.length === 0) {
      alert("Ajoute au moins un article au panier avant de continuer.");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setOrderDone(true);
    }
  }

  function resetOrder() {
    setCart([]);
    setStep(1);
    setOrderDone(false);
    setSurveyDone(false);
  }

  return (
    <div>
      <header>
        <h1>SamiTech Store</h1>
        <p>Équipement tech simple, utile et abordable pour étudiants et gamers.</p>
      </header>

      <main className="container">

        <section className="promo">
          <h2>Offre spéciale étudiant !</h2>
          <p>
            Économise sur tes accessoires essentiels aujourd’hui. Ajoute un produit au panier et complète ta commande en quelques étapes simples.
          </p>
        </section>

        <section className="filters">
          <h2>Recherche à facettes</h2>
          <p>Explore les produits selon ton besoin : catégorie, prix ou note.</p>

          <div className="filter-group">
            <label>Recherche</label>
            <input
              type="text"
              placeholder="Ex: casque, souris, clavier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Tous</option>
              <option>Audio</option>
              <option>Clavier</option>
              <option>Souris</option>
              <option>Accessoire</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Prix maximum</label>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option>Tous</option>
              <option value="50">50 $ ou moins</option>
              <option value="80">80 $ ou moins</option>
              <option value="100">100 $ ou moins</option>
              <option value="150">150 $ ou moins</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Note minimale</label>
            <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
              <option>Tous</option>
              <option value="3">3 étoiles et plus</option>
              <option value="4">4 étoiles et plus</option>
              <option value="5">5 étoiles</option>
            </select>
          </div>
        </section>

        <section>
          <h2>Produits disponibles</h2>

          <div className="products">
            {filteredProducts.map(product => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="card-body">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p><strong>Catégorie :</strong> {product.category}</p>
                  <p className="rating">{"★".repeat(product.rating)}</p>
                  <p className="price">{product.price} $</p>

                  <button onClick={() => addToCart(product)}>
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cart">
          <h2>Panier</h2>

          {cart.length === 0 ? (
            <p>Ton panier est vide.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>{item.name} - {item.price} $</span>
                <button onClick={() => removeFromCart(index)}>Retirer</button>
              </div>
            ))
          )}

          <p className="total">Total : {total} $</p>
        </section>

        <section className="checkout">
          <h2>Processus d’achat</h2>
          <p>Étape {step} sur 3</p>

          {!orderDone ? (
            <>
              {step === 1 && (
                <div className="step">
                  <h3>Étape 1 : Informations personnelles</h3>
                  <input type="text" placeholder="Nom complet" />
                  <input type="email" placeholder="Adresse courriel" />
                  <input type="text" placeholder="Adresse de livraison" />
                </div>
              )}

              {step === 2 && (
                <div className="step">
                  <h3>Étape 2 : Paiement</h3>
                  <input type="text" placeholder="Nom sur la carte" />
                  <input type="text" placeholder="Numéro de carte" />
                  <input type="text" placeholder="MM/AA" />
                  <input type="text" placeholder="CVV" />
                </div>
              )}

              {step === 3 && (
                <div className="step">
                  <h3>Étape 3 : Vérification</h3>
                  <p>Vérifie ton panier et confirme ta commande.</p>
                  <p>Total à payer : <strong>{total} $</strong></p>
                </div>
              )}

              <button onClick={nextStep}>
                {step < 3 ? "Continuer" : "Confirmer la commande"}
              </button>
            </>
          ) : (
            <div className="success">
              <h3>Commande confirmée !</h3>
              <p>Merci pour ton achat. Un courriel de confirmation sera envoyé bientôt.</p>
              <button onClick={resetOrder}>Nouvelle commande</button>
            </div>
          )}
        </section>

        <section className="checkout">
          <h2>Sondage rapide</h2>
          <p>Comment s’est passée ton expérience sur SamiTech Store ?</p>

          {!surveyDone ? (
            <>
              <select>
                <option>Très satisfait</option>
                <option>Satisfait</option>
                <option>Neutre</option>
                <option>Insatisfait</option>
              </select>

              <textarea placeholder="Laisse un commentaire..." rows="4"></textarea>

              <button onClick={() => setSurveyDone(true)}>
                Envoyer le sondage
              </button>
            </>
          ) : (
            <div className="success">
              <p>Merci pour ta rétroaction ! Ton avis m’aide à améliorer le site.</p>
            </div>
          )}
        </section>

      </main>

      <footer>
        <p>Designed by Sami Diouf · SEG3525</p>
        <p><a href="index.html">Retour au portfolio</a></p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
