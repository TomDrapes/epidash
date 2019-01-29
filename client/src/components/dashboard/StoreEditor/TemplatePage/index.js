import React, {Component} from 'react'
import reactCSS from 'reactcss'
import './style.scss'


export default class TemplatePage extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        
        const styles = reactCSS({
            'default': {
                logo: {                    
                    marginRight: 'auto'
                },
                header: {
                    width: '100%',
                    height: '100%',
                    boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',   
                    backgroundImage: `url(${this.props.heroImage})`,
                    backgroundSize: '100% 100%'

                },
                headerMenu: {
                    color: this.props.menuFontColor,
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    fontSize: this.props.menuFontSize
                },

                headerMenuLinks: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '20%',
                },

                headerOverlay: {
                    color: 'white',
                    justifySelf: 'center',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                },

                headerTitle: {
                    fontSize: this.props.headingFontSize,
                    color: this.props.headingFontColor
                },
                headerSubtitle: {
                    fontSize: this.props.subheadingFontSize,
                    color: this.props.subheadingFontColor
                },
                buyNowBtn: {
                    fontSize: this.props.buttonFontSize,
                    background: this.props.buttonBgColor,
                    color: this.props.buttonFontColor,
                    borderColor: this.props.buttonFontColor,
                    border: '2px solid white',
                    padding: '10px',
                    borderRadius: '3px',
                    marginTop: '10px'
                },
                body: {
                    padding: '0px 20px 0px 20px',
                    background: 'white'
                },
                bodySection: {
                    display: 'flex',
                    alignItems: 'center',
                    height: '400px',
                    margin: '20px 0px 20px 0px'          
                },
                bodyCopy: {
                    padding: '30px',
                    textAlign: 'center',
                },
                boldCopy: {
                    fontWeight: 'bold',
                    fontSize: '18px'
                },
                bannerImage: {
                    backgroundImage: `url('/images/girl_sunglasses.jpg')`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                bannerCopy: {
                    background: 'rgba(255,255,255,0.5)',
                    padding: '10px',
                    textAlign: 'center'
                },
                bannerCopyH1:{
                    fontSize: '44px',
                    fontWeight: 'bold'
                },
                bannerCopyH2: {
                    fontSize: '38px'
                },
                productListing: {
                    padding: '20px',
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                productName: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                },
                productDescriptionContainer: {
                    padding: '20px',
                    width: '40%',
                },
                productDescription: {
                    marginBottom: '20px'
                },
                productPrice: {
                    fontWeight: 'bold'
                },
                productQuantityContainer: {
                    display: 'flex',
                    alignItems: 'center',                    
                },
                quantityBox: {
                    width: '30px',
                    textAlign: 'center',
                    margin: '10px'
                },
                atcBtn: {
                    padding: '8px',
                    background: '#2c2c2c',
                    color: 'white',
                }
            }
        })
        return (
            <div className='template-page-container'>
                <div className='template-page'> 
                    <div className='template-header' style={styles.header}>
                        
                        <div style={styles.headerMenu}>
                            <img style={styles.logo} src={this.props.logo} width={`${this.props.logoWidth}px`} height={`auto`} alt='page-logo' />
                            <div style={styles.headerMenuLinks}>
                                <div>About Us</div>
                                <div>Contact</div>
                                <div>Cart <i className="fas fa-cart-plus"></i></div>
                            </div>                            
                        </div>
                        <div style={styles.headerOverlay}>
                            <div>
                                <p style={styles.headerTitle}>{this.props.headingText}</p>
                                <p style={styles.headerSubtitle}>{this.props.subheadingText}</p>
                                <button style={styles.buyNowBtn}>Buy Now</button>                                
                            </div>
                        </div>
                    </div>

                    <div style={styles.body}>
                        <div style={styles.bodySection}>
                            <img src={'/images/glasses_yellow.jpg'} width='auto' height='400px' />
                            <div style={styles.bodyCopy}>
                                <p style={styles.boldCopy}>Maecenas ultrices, mauris quis porta molestie</p>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium condimentum ante a aliquet. Fusce sit amet nibh vitae ex commodo malesuada. Donec aliquam est gravida nisl venenatis mattis sit amet in libero. In sit amet hendrerit tortor, et finibus lacus. Vestibulum blandit cursus lorem, pellentesque feugiat sem facilisis at. In hac habitasse platea dictumst. Nullam blandit elit ipsum, nec cursus tellus ornare in. Quisque ultricies hendrerit quam</p>  
                            </div>
                        </div>
                        <div style={styles.bodySection}>
                            <div style={styles.bodyCopy}>
                                <p style={styles.boldCopy}>Maecenas ultrices, mauris quis porta molestie</p>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium condimentum ante a aliquet. Fusce sit amet nibh vitae ex commodo malesuada. Donec aliquam est gravida nisl venenatis mattis sit amet in libero. In sit amet hendrerit tortor, et finibus lacus. Vestibulum blandit cursus lorem, pellentesque feugiat sem facilisis at. In hac habitasse platea dictumst. Nullam blandit elit ipsum, nec cursus tellus ornare in. Quisque ultricies hendrerit quam</p>
                            </div>
                            <img src={'/images/sunglasses_on_record.png'} width='auto' height='400px' />
                        </div>                    
                    </div>
                    <div style={styles.bannerImage}>
                        <div style={styles.bannerCopy}>
                            <p style={styles.bannerCopyH1}>"A thoughtful quote or store motto"</p>
                            <p style={styles.bannerCopyH2}>-Would look great here</p>                        
                        </div>
                    </div>
                    <div style={styles.productListing}>
                        <img src={'/images/role_ban_1.jpg'} width='400px' height='auto' />
                        <div style={styles.productDescriptionContainer}>
                            <p style={styles.productName}>Faux RayBan Sunglasses</p>
                            <p style={styles.productDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla elementum ante, sit amet venenatis odio pulvinar quis. Pellentesque facilisis risus nec ante rhoncus, nec tincidunt magna tristique. In id pretium magna, eu dictum libero. Mauris fermentum, lectus eget placerat lacinia, arcu diam posuere erat, ut porta lectus est quis libero. Maecenas ultrices, mauris quis porta molestie, sem felis rhoncus felis, id pharetra purus lorem id leo.</p>
                            <p style={styles.productPrice}>$19.99</p>
                            <div style={styles.productQuantityContainer}>
                                <p style={styles.productQuantity}>Quantity: </p><input style={styles.quantityBox} type='number' value={1} />                            
                            </div>
                            <button style={styles.atcBtn}>Add To Cart</button>
                        </div>
                    </div>
        
                </div>            
            </div>
        )    
    }
}